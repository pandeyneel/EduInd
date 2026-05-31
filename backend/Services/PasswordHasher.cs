using System;
using System.Security.Cryptography;
using System.Text;

namespace backend.Services
{
    public static class PasswordHasher
    {
        private const int SaltSize = 16; // 128 bits
        private const int KeySize = 32;  // 256 bits
        private const int Iterations = 100000;
        private static readonly HashAlgorithmName HashAlgorithm = HashAlgorithmName.SHA256;

        public static string HashPassword(string password)
        {
            byte[] salt = RandomNumberGenerator.GetBytes(SaltSize);
            byte[] hash = Rfc2898DeriveBytes.Pbkdf2(
                Encoding.UTF8.GetBytes(password),
                salt,
                Iterations,
                HashAlgorithm,
                KeySize);

            return $"{Convert.ToBase64String(salt)}.{Convert.ToBase64String(hash)}";
        }

        public static bool VerifyPassword(string password, string hashedPassword)
        {
            try
            {
                var parts = hashedPassword.Split('.', 2);
                if (parts.Length != 2) return false;

                byte[] salt = Convert.FromBase64String(parts[0]);
                byte[] hash = Convert.FromBase64String(parts[1]);

                byte[] inputHash = Rfc2898DeriveBytes.Pbkdf2(
                    Encoding.UTF8.GetBytes(password),
                    salt,
                    Iterations,
                    HashAlgorithm,
                    KeySize);

                return CryptographicOperations.FixedTimeEquals(hash, inputHash);
            }
            catch
            {
                return false;
            }
        }
    }
}
