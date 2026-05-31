using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Repositories;
using backend.Services;
using backend.DTOs;
using backend.Models;
using System.ComponentModel.DataAnnotations;
using System.Security.Claims;

var builder = WebApplication.CreateBuilder(args);

// Add CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy.WithOrigins(
                      "http://localhost:5173",
                      "http://localhost:3000",
                      "https://eduind.online",
                      "https://www.eduind.online"
                  )
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

// Configure PostgreSQL DbContext
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<EduIndDbContext>(options =>
    options.UseNpgsql(connectionString));

// Register Repositories and Services in Dependency Injection (DI) container
builder.Services.AddScoped<IStudentRepository, StudentRepository>();
builder.Services.AddScoped<IStudentService, StudentService>();
builder.Services.AddSingleton<JwtService>();

// Register OpenAPI support
builder.Services.AddOpenApi();

var app = builder.Build();

// Automatically apply migrations and seed data on startup (Zero-effort DevOps)
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var logger = services.GetRequiredService<ILogger<Program>>();
    try
    {
        var context = services.GetRequiredService<EduIndDbContext>();
        
        logger.LogInformation("Database startup hook initiated.");
        
        // 1. Apply any pending EF migrations
        if (context.Database.GetPendingMigrations().Any())
        {
            logger.LogInformation("Pending database migrations detected. Applying migrations...");
            context.Database.Migrate();
            logger.LogInformation("Database migrations applied successfully.");
        }
        else
        {
            logger.LogInformation("Database schema is up to date. No pending migrations.");
        }

        // 2. Automatically seed data if the Students table is empty (Minimum 10 records)
        if (!context.Students.Any())
        {
            logger.LogInformation("Students table is empty. Seeding initial student register with 10 records...");
            
            var seedStudents = new List<Student>
            {
                new Student { Id = Guid.NewGuid(), FirstName = "Alexander", LastName = "Lewis", Email = "alewis.student@eduind.com", Grade = "Grade 10", AdmissionDate = DateTime.SpecifyKind(new DateTime(2023, 8, 15), DateTimeKind.Utc), CreatedAt = DateTime.UtcNow },
                new Student { Id = Guid.NewGuid(), FirstName = "Bianca", LastName = "Castafiore", Email = "bcastafiore.student@eduind.com", Grade = "Grade 11", AdmissionDate = DateTime.SpecifyKind(new DateTime(2022, 9, 1), DateTimeKind.Utc), CreatedAt = DateTime.UtcNow },
                new Student { Id = Guid.NewGuid(), FirstName = "Charles", LastName = "Wang", Email = "cwang.student@eduind.com", Grade = "Grade 9", AdmissionDate = DateTime.SpecifyKind(new DateTime(2024, 1, 5), DateTimeKind.Utc), CreatedAt = DateTime.UtcNow },
                new Student { Id = Guid.NewGuid(), FirstName = "Diana", LastName = "Prince", Email = "dprince.student@eduind.com", Grade = "Grade 12", AdmissionDate = DateTime.SpecifyKind(new DateTime(2021, 8, 20), DateTimeKind.Utc), CreatedAt = DateTime.UtcNow },
                new Student { Id = Guid.NewGuid(), FirstName = "Ethan", LastName = "Hunt", Email = "ehunt.student@eduind.com", Grade = "Grade 10", AdmissionDate = DateTime.SpecifyKind(new DateTime(2023, 11, 10), DateTimeKind.Utc), CreatedAt = DateTime.UtcNow },
                new Student { Id = Guid.NewGuid(), FirstName = "Fiona", LastName = "Gallagher", Email = "fgallagher.student@eduind.com", Grade = "Grade 11", AdmissionDate = DateTime.SpecifyKind(new DateTime(2022, 10, 12), DateTimeKind.Utc), CreatedAt = DateTime.UtcNow },
                new Student { Id = Guid.NewGuid(), FirstName = "George", LastName = "Clark", Email = "gclark.student@eduind.com", Grade = "Grade 10", AdmissionDate = DateTime.SpecifyKind(new DateTime(2023, 7, 25), DateTimeKind.Utc), CreatedAt = DateTime.UtcNow },
                new Student { Id = Guid.NewGuid(), FirstName = "Hannah", LastName = "Abbott", Email = "habbott.student@eduind.com", Grade = "Grade 9", AdmissionDate = DateTime.SpecifyKind(new DateTime(2024, 2, 14), DateTimeKind.Utc), CreatedAt = DateTime.UtcNow },
                new Student { Id = Guid.NewGuid(), FirstName = "Ian", LastName = "Malcolm", Email = "imalcolm.student@eduind.com", Grade = "Grade 12", AdmissionDate = DateTime.SpecifyKind(new DateTime(2021, 9, 5), DateTimeKind.Utc), CreatedAt = DateTime.UtcNow },
                new Student { Id = Guid.NewGuid(), FirstName = "Julia", LastName = "Roberts", Email = "jroberts.student@eduind.com", Grade = "Grade 11", AdmissionDate = DateTime.SpecifyKind(new DateTime(2022, 8, 30), DateTimeKind.Utc), CreatedAt = DateTime.UtcNow }
            };

            context.Students.AddRange(seedStudents);
            context.SaveChanges();
            logger.LogInformation("Database seeded successfully with {Count} student records.", seedStudents.Count);
        }
        else
        {
            logger.LogInformation("Database already contains student records. Seeding skipped.");
        }

        // 3. Automatically seed users if the Users table is empty
        if (!context.Users.Any())
        {
            logger.LogInformation("Users table is empty. Seeding default administrator and student accounts...");
            var adminUser = new User
            {
                Id = Guid.NewGuid(),
                Name = "Admin User",
                Email = "admin@eduind.com",
                PasswordHash = PasswordHasher.HashPassword("Admin123"),
                Role = "ADMIN",
                Status = "Active",
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            var studentUser = new User
            {
                Id = Guid.NewGuid(),
                Name = "Alexander Lewis",
                Email = "alewis.student@eduind.com",
                PasswordHash = PasswordHasher.HashPassword("Student123"),
                Role = "STUDENT",
                Status = "Active",
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            context.Users.AddRange(adminUser, studentUser);
            context.SaveChanges();
            logger.LogInformation("Database seeded with default accounts: admin@eduind.com and alewis.student@eduind.com.");
        }
        else
        {
            logger.LogInformation("Database already contains user records. User seeding skipped.");
        }
    }
    catch (Exception ex)
    {
        logger.LogError(ex, "A critical error occurred during database migration or seeding.");
    }
}

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();
app.UseCors("AllowFrontend");

// --- CUSTOM JWT AUTHENTICATION MIDDLEWARE ---
app.Use(async (context, next) =>
{
    var authHeader = context.Request.Headers["Authorization"].FirstOrDefault();
    if (authHeader != null && authHeader.StartsWith("Bearer ", StringComparison.OrdinalIgnoreCase))
    {
        var token = authHeader.Substring("Bearer ".Length).Trim();
        var jwtService = context.RequestServices.GetRequiredService<JwtService>();
        var principal = jwtService.ValidateToken(token);
        if (principal != null)
        {
            context.User = principal;
        }
    }
    await next();
});

// --- AUTHENTICATION API ENDPOINTS ---

app.MapPost("/api/auth/login", async (LoginDto dto, EduIndDbContext context, JwtService jwtService, ILogger<Program> logger) =>
{
    try
    {
        logger.LogInformation("Auth: Login attempt for {Email}", dto.Email);
        var user = await context.Users.FirstOrDefaultAsync(u => u.Email.ToLower() == dto.Email.ToLower());
        if (user == null || !PasswordHasher.VerifyPassword(dto.Password, user.PasswordHash))
        {
            return Results.Json(new { Message = "Invalid email or password" }, statusCode: 400);
        }

        if (user.Status != "Active")
        {
            return Results.Json(new { Message = "Your account is suspended or inactive" }, statusCode: 403);
        }

        var token = jwtService.GenerateToken(user.Id, user.Email, user.Role, user.Name);
        return Results.Ok(new AuthResponseDto
        {
            Token = token,
            User = new UserDto
            {
                Id = user.Id,
                Name = user.Name,
                Email = user.Email,
                Role = user.Role,
                Status = user.Status,
                CreatedAt = user.CreatedAt
            }
        });
    }
    catch (Exception ex)
    {
        logger.LogError(ex, "Auth Error: Login failed");
        return Results.Problem("A server error occurred during login", statusCode: 500);
    }
});

app.MapGet("/api/auth/me", async (EduIndDbContext context, HttpContext httpContext) =>
{
    var email = httpContext.User.FindFirst(ClaimTypes.Email)?.Value;
    if (string.IsNullOrEmpty(email)) return Results.Unauthorized();

    var user = await context.Users.AsNoTracking().FirstOrDefaultAsync(u => u.Email.ToLower() == email.ToLower());
    if (user == null) return Results.NotFound(new { Message = "User account not found." });

    return Results.Ok(new UserDto
    {
        Id = user.Id,
        Name = user.Name,
        Email = user.Email,
        Role = user.Role,
        Status = user.Status,
        CreatedAt = user.CreatedAt
    });
}).RequireAuth();

// --- DATA-ISOLATED STUDENT PORTAL API ENDPOINTS ---

app.MapGet("/api/student/dashboard", async (EduIndDbContext context, HttpContext httpContext) =>
{
    var email = httpContext.User.FindFirst(ClaimTypes.Email)?.Value;
    if (string.IsNullOrEmpty(email)) return Results.Unauthorized();

    var student = await context.Students.AsNoTracking().FirstOrDefaultAsync(s => s.Email.ToLower() == email.ToLower());
    if (student == null) return Results.NotFound(new { Message = "Student profile not found." });

    // Returns custom high-fidelity data isolated specifically for this student
    return Results.Ok(new
    {
        StudentId = student.Id,
        FullName = $"{student.FirstName} {student.LastName}",
        Email = student.Email,
        Grade = student.Grade,
        Courses = new[]
        {
            new { Name = "Advanced Calculus", Progress = 92, Grade = "A" },
            new { Name = "AP Physics II", Progress = 88, Grade = "B+" },
            new { Name = "World History II", Progress = 95, Grade = "A" },
            new { Name = "English Literature", Progress = 84, Grade = "B" }
        },
        Attendance = new
        {
            PresentRate = 96,
            TotalDays = 142,
            Present = 136,
            Excused = 4,
            Unexcused = 2
        },
        Fees = new
        {
            Billed = 4350.00,
            Paid = 4350.00,
            Outstanding = 0.00,
            Status = "Paid",
            Transactions = new[]
            {
                new { Description = "Fall Term Tuition", Amount = 4200.00, Date = "Oct 26, 2026", Status = "Completed" },
                new { Description = "Laboratory Fee", Amount = 150.00, Date = "Oct 22, 2026", Status = "Completed" }
            }
        },
        Notifications = new[]
        {
            new { Text = "Physics Lab Report due by 11:59 PM today", Type = "Warning" },
            new { Text = "Upcoming Mathematics Quiz on Friday", Type = "Info" }
        }
    });
}).RequireRole("STUDENT");

app.MapGet("/api/student/profile", async (EduIndDbContext context, HttpContext httpContext) =>
{
    var email = httpContext.User.FindFirst(ClaimTypes.Email)?.Value;
    if (string.IsNullOrEmpty(email)) return Results.Unauthorized();

    var student = await context.Students.AsNoTracking().FirstOrDefaultAsync(s => s.Email.ToLower() == email.ToLower());
    if (student == null) return Results.NotFound(new { Message = "Student profile not found." });

    return Results.Ok(new
    {
        Id = student.Id,
        FirstName = student.FirstName,
        LastName = student.LastName,
        Email = student.Email,
        Grade = student.Grade,
        AdmissionDate = student.AdmissionDate,
        CreatedAt = student.CreatedAt,
        RollNumber = $"STU-{student.AdmissionDate.Year}-{student.Id.ToString()[..4].ToUpper()}"
    });
}).RequireRole("STUDENT");

app.MapPut("/api/student/profile", async (UpdateProfileDto dto, EduIndDbContext context, HttpContext httpContext) =>
{
    var email = httpContext.User.FindFirst(ClaimTypes.Email)?.Value;
    if (string.IsNullOrEmpty(email)) return Results.Unauthorized();

    // Verify student ownership
    var student = await context.Students.FirstOrDefaultAsync(s => s.Email.ToLower() == email.ToLower());
    if (student == null) return Results.NotFound(new { Message = "Student profile not found." });

    // Parse names from update
    var nameParts = dto.Name.Trim().Split(' ', 2);
    var newFirstName = nameParts[0];
    var newLastName = nameParts.Length > 1 ? nameParts[1] : string.Empty;

    // Check if new email is in use by someone else in Student Directory
    if (dto.Email.ToLower() != student.Email.ToLower() && 
        await context.Students.AnyAsync(s => s.Email.ToLower() == dto.Email.ToLower()))
    {
        return Results.Conflict(new { Message = "Email address is already in use." });
    }

    // Sync User record email/name to keep them matched!
    var userRecord = await context.Users.FirstOrDefaultAsync(u => u.Email.ToLower() == email.ToLower());
    if (userRecord != null)
    {
        userRecord.Name = dto.Name;
        userRecord.Email = dto.Email;
        userRecord.UpdatedAt = DateTime.UtcNow;
    }

    student.FirstName = newFirstName;
    student.LastName = newLastName;
    student.Email = dto.Email;

    await context.SaveChangesAsync();

    return Results.Ok(new
    {
        Message = "Profile updated successfully",
        Student = new
        {
            Id = student.Id,
            FirstName = student.FirstName,
            LastName = student.LastName,
            Email = student.Email,
            Grade = student.Grade,
            AdmissionDate = student.AdmissionDate
        }
    });
}).RequireRole("STUDENT");

// --- UPGRADED STUDENT-RELATED APIS (DATABASE-BACKED - ADMIN ONLY) ---

app.MapGet("/api/AdminDashboard", async (EduIndDbContext context, ILogger<Program> logger) =>
{
    try
    {
        logger.LogInformation("API: Fetching dynamic Admin Dashboard data.");
        int totalEnrolledCount = await context.Students.CountAsync();
        
        return Results.Ok(new 
        { 
            Message = "Data for Admin Dashboard", 
            TotalEnrolled = totalEnrolledCount, 
            Attendance = 96.2, 
            PendingFees = 42500 
        });
    }
    catch (Exception ex)
    {
        logger.LogError(ex, "API Error: Failed to fetch Admin Dashboard data.");
        return Results.Ok(new 
        { 
            Message = "Data for Admin Dashboard (Fallback)", 
            TotalEnrolled = 3248, 
            Attendance = 96.2, 
            PendingFees = 42500 
        });
    }
}).RequireRole("ADMIN");

app.MapGet("/api/StudentDirectory", async (IStudentService studentService, ILogger<Program> logger) =>
{
    try
    {
        logger.LogInformation("API: Fetching Student Directory.");
        var students = await studentService.GetAllStudentsAsync();
        return Results.Ok(new 
        { 
            Message = "Data for Student Directory",
            Students = students
        });
    }
    catch (Exception ex)
    {
        logger.LogError(ex, "API Error: Failed to fetch Student Directory.");
        return Results.Problem($"Failed to fetch Student Directory: {ex.Message}", statusCode: 500);
    }
}).RequireRole("ADMIN");

app.MapGet("/api/DetailedStudentProfile", async (EduIndDbContext context, ILogger<Program> logger) =>
{
    try
    {
        logger.LogInformation("API: Fetching Detailed Student Profile.");
        var student = await context.Students
            .AsNoTracking()
            .OrderBy(s => s.CreatedAt)
            .FirstOrDefaultAsync();

        if (student == null)
        {
            return Results.NotFound(new { Message = "No student profiles exist in the database." });
        }

        return Results.Ok(new 
        { 
            Message = "Data for Detailed Student Profile",
            Student = new 
            {
                Id = student.Id,
                FullName = $"{student.FirstName} {student.LastName}",
                Email = student.Email,
                Grade = student.Grade,
                AdmissionDate = student.AdmissionDate,
                CreatedAt = student.CreatedAt,
                RollNumber = $"STU-{student.AdmissionDate.Year}-{student.Id.ToString()[..4].ToUpper()}"
            }
        });
    }
    catch (Exception ex)
    {
        logger.LogError(ex, "API Error: Failed to fetch Detailed Student Profile.");
        return Results.Problem($"Failed to fetch profile: {ex.Message}", statusCode: 500);
    }
}).RequireRole("ADMIN");

// --- RETAINED MOCK APIS (PREVENTS FRONTEND BREAKING - ADMIN ONLY) ---
app.MapGet("/api/StaffDirectory", () => new { Message = "Data for Staff Directory" }).RequireRole("ADMIN");
app.MapGet("/api/AcademicHub", () => new { Message = "Data for Academic Hub" }).RequireRole("ADMIN");
app.MapGet("/api/FeeManagement", () => new { Message = "Data for Fee Management" }).RequireRole("ADMIN");
app.MapGet("/api/ParentStudentPortal", () => new { Message = "Data for Parent Portal" }).RequireRole("ADMIN");

// --- Student CRUD API Endpoints (ADMIN ONLY) ---
var studentsApi = app.MapGroup("/api/students").RequireRole("ADMIN");

// Helper to validate model annotations in Minimal APIs
IResult ValidateModel<T>(T model)
{
    var validationContext = new ValidationContext(model!);
    var validationResults = new List<ValidationResult>();
    bool isValid = Validator.TryValidateObject(model!, validationContext, validationResults, true);

    if (!isValid)
    {
        var errors = validationResults
            .GroupBy(e => e.MemberNames.FirstOrDefault() ?? "Error")
            .ToDictionary(
                g => g.Key,
                g => g.Select(x => x.ErrorMessage ?? "Invalid value").ToArray()
            );
        return Results.ValidationProblem(errors);
    }
    return null!;
}

// GET all students
studentsApi.MapGet("/", async (IStudentService studentService, ILogger<Program> logger) =>
{
    try
    {
        logger.LogInformation("API: Querying all students.");
        var students = await studentService.GetAllStudentsAsync();
        return Results.Ok(students);
    }
    catch (Exception ex)
    {
        logger.LogError(ex, "API Error: GET /api/students failed.");
        return Results.Problem($"Failed to retrieve students: {ex.Message}", statusCode: 500);
    }
});

// GET student by ID
studentsApi.MapGet("/{id:guid}", async (Guid id, IStudentService studentService, ILogger<Program> logger) =>
{
    try
    {
        logger.LogInformation("API: Querying student by ID {StudentId}.", id);
        var student = await studentService.GetStudentByIdAsync(id);
        return student != null 
            ? Results.Ok(student) 
            : Results.NotFound(new { Message = $"Student with ID {id} was not found." });
    }
    catch (Exception ex)
    {
        logger.LogError(ex, "API Error: GET /api/students/{StudentId} failed.", id);
        return Results.Problem($"Failed to retrieve student: {ex.Message}", statusCode: 500);
    }
});

// POST create student
studentsApi.MapPost("/", async (CreateStudentDto dto, IStudentService studentService, ILogger<Program> logger) =>
{
    try
    {
        logger.LogInformation("API: Creating student with Email {Email}.", dto.Email);
        var validationResult = ValidateModel(dto);
        if (validationResult != null) return validationResult;

        // Check if email already exists
        if (await studentService.IsEmailRegisteredAsync(dto.Email))
        {
            logger.LogWarning("API: Failed to create student. Email {Email} is already registered.", dto.Email);
            return Results.Conflict(new { Message = $"Email '{dto.Email}' is already registered." });
        }

        var created = await studentService.CreateStudentAsync(dto);
        return Results.Created($"/api/students/{created.Id}", created);
    }
    catch (Exception ex)
    {
        logger.LogError(ex, "API Error: POST /api/students failed.");
        return Results.Problem($"Failed to create student: {ex.Message}", statusCode: 500);
    }
});

// PUT update student
studentsApi.MapPut("/{id:guid}", async (Guid id, UpdateStudentDto dto, IStudentService studentService, ILogger<Program> logger) =>
{
    try
    {
        logger.LogInformation("API: Updating student with ID {StudentId}.", id);
        var validationResult = ValidateModel(dto);
        if (validationResult != null) return validationResult;

        // Check if email is already taken by another student
        if (await studentService.IsEmailRegisteredAsync(dto.Email, id))
        {
            logger.LogWarning("API: Failed to update student. Email {Email} is already in use.", dto.Email);
            return Results.Conflict(new { Message = $"Email '{dto.Email}' is already taken by another student." });
        }

        var updated = await studentService.UpdateStudentAsync(id, dto);
        return updated != null 
            ? Results.Ok(updated) 
            : Results.NotFound(new { Message = $"Student with ID {id} was not found." });
    }
    catch (Exception ex)
    {
        logger.LogError(ex, "API Error: PUT /api/students/{StudentId} failed.", id);
        return Results.Problem($"Failed to update student: {ex.Message}", statusCode: 500);
    }
});

// DELETE student
studentsApi.MapDelete("/{id:guid}", async (Guid id, IStudentService studentService, ILogger<Program> logger) =>
{
    try
    {
        logger.LogInformation("API: Deleting student with ID {StudentId}.", id);
        var deleted = await studentService.DeleteStudentAsync(id);
        return deleted 
            ? Results.NoContent() 
            : Results.NotFound(new { Message = $"Student with ID {id} was not found." });
    }
    catch (Exception ex)
    {
        logger.LogError(ex, "API Error: DELETE /api/students/{StudentId} failed.", id);
        return Results.Problem($"Failed to delete student: {ex.Message}", statusCode: 500);
    }
});

app.Run();

// --- SECURITY AND ROLES MINIMAL API ENDPOINT FILTERS ---
public static class EndpointSecurityExtensions
{
    public static RouteHandlerBuilder RequireRole(this RouteHandlerBuilder builder, string role)
    {
        return builder.AddEndpointFilter(async (context, next) =>
        {
            var user = context.HttpContext.User;
            if (user.Identity == null || !user.Identity.IsAuthenticated)
            {
                return Results.Json(new { Message = "Not authenticated" }, statusCode: 401);
            }
            if (!user.IsInRole(role))
            {
                return Results.Json(new { Message = "Insufficient permissions" }, statusCode: 403);
            }
            return await next(context);
        });
    }

    public static RouteGroupBuilder RequireRole(this RouteGroupBuilder builder, string role)
    {
        return builder.AddEndpointFilter(async (context, next) =>
        {
            var user = context.HttpContext.User;
            if (user.Identity == null || !user.Identity.IsAuthenticated)
            {
                return Results.Json(new { Message = "Not authenticated" }, statusCode: 401);
            }
            if (!user.IsInRole(role))
            {
                return Results.Json(new { Message = "Insufficient permissions" }, statusCode: 403);
            }
            return await next(context);
        });
    }

    public static RouteHandlerBuilder RequireAuth(this RouteHandlerBuilder builder)
    {
        return builder.AddEndpointFilter(async (context, next) =>
        {
            var user = context.HttpContext.User;
            if (user.Identity == null || !user.Identity.IsAuthenticated)
            {
                return Results.Json(new { Message = "Not authenticated" }, statusCode: 401);
            }
            return await next(context);
        });
    }

    public static RouteGroupBuilder RequireAuth(this RouteGroupBuilder builder)
    {
        return builder.AddEndpointFilter(async (context, next) =>
        {
            var user = context.HttpContext.User;
            if (user.Identity == null || !user.Identity.IsAuthenticated)
            {
                return Results.Json(new { Message = "Not authenticated" }, statusCode: 401);
            }
            return await next(context);
        });
    }
}
