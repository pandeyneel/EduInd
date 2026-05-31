using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;

namespace backend.Services
{
    public class JwtService
    {
        // 256-bit cryptographically secure secret key
        private static readonly byte[] SecretKey = Encoding.UTF8.GetBytes("EduIndSmartEducationManagementSystemSuperSecretKey2026!");

        public string GenerateToken(Guid userId, string email, string role, string name)
        {
            var header = new { alg = "HS256", typ = "JWT" };
            var payload = new
            {
                sub = userId.ToString(),
                email = email,
                role = role,
                name = name,
                exp = DateTimeOffset.UtcNow.AddDays(7).ToUnixTimeSeconds()
            };

            string base64Header = Base64UrlEncode(JsonSerializer.Serialize(header));
            string base64Payload = Base64UrlEncode(JsonSerializer.Serialize(payload));
            string unsignedToken = $"{base64Header}.{base64Payload}";

            using var hmac = new HMACSHA256(SecretKey);
            byte[] signatureBytes = hmac.ComputeHash(Encoding.UTF8.GetBytes(unsignedToken));
            string base64Signature = Base64UrlEncode(signatureBytes);

            return $"{unsignedToken}.{base64Signature}";
        }

        public ClaimsPrincipal? ValidateToken(string token)
        {
            try
            {
                var parts = token.Split('.');
                if (parts.Length != 3) return null;

                string header = parts[0];
                string payload = parts[1];
                string signature = parts[2];

                // Verify signature integrity
                string unsignedToken = $"{header}.{payload}";
                using var hmac = new HMACSHA256(SecretKey);
                byte[] expectedSignatureBytes = hmac.ComputeHash(Encoding.UTF8.GetBytes(unsignedToken));
                string expectedSignature = Base64UrlEncode(expectedSignatureBytes);

                if (signature != expectedSignature)
                {
                    return null;
                }

                // Decode payload
                string decodedPayload = Encoding.UTF8.GetString(Base64UrlDecode(payload));
                var payloadData = JsonSerializer.Deserialize<JwtPayload>(decodedPayload);

                if (payloadData == null) return null;

                // Validate expiration
                if (DateTimeOffset.UtcNow.ToUnixTimeSeconds() > payloadData.exp)
                {
                    return null;
                }

                // Construct identity claims
                var claims = new List<Claim>
                {
                    new Claim(ClaimTypes.NameIdentifier, payloadData.sub),
                    new Claim(ClaimTypes.Email, payloadData.email),
                    new Claim(ClaimTypes.Role, payloadData.role),
                    new Claim(ClaimTypes.Name, payloadData.name)
                };

                var identity = new ClaimsIdentity(claims, "CustomJwtBearer");
                return new ClaimsPrincipal(identity);
            }
            catch
            {
                return null;
            }
        }

        private static string Base64UrlEncode(string input)
        {
            byte[] bytes = Encoding.UTF8.GetBytes(input);
            return Base64UrlEncode(bytes);
        }

        private static string Base64UrlEncode(byte[] input)
        {
            return Convert.ToBase64String(input)
                .Replace("=", "")
                .Replace("+", "-")
                .Replace("/", "_");
        }

        private static byte[] Base64UrlDecode(string input)
        {
            string padded = input.PadRight(input.Length + (4 - input.Length % 4) % 4, '=')
                .Replace("-", "+")
                .Replace("_", "/");
            return Convert.FromBase64String(padded);
        }

        private class JwtPayload
        {
            public string sub { get; set; } = string.Empty;
            public string email { get; set; } = string.Empty;
            public string role { get; set; } = string.Empty;
            public string name { get; set; } = string.Empty;
            public long exp { get; set; }
        }
    }
}
