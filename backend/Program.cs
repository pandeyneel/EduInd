using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Repositories;
using backend.Services;
using backend.DTOs;
using backend.Models;
using System.ComponentModel.DataAnnotations;

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

// --- UPGRADED STUDENT-RELATED APIS (DATABASE-BACKED) ---

// 1. GET /api/AdminDashboard: Dynamic student count combined with other mock statistics
app.MapGet("/api/AdminDashboard", async (EduIndDbContext context, ILogger<Program> logger) =>
{
    try
    {
        logger.LogInformation("API: Fetching dynamic Admin Dashboard data.");
        int totalEnrolledCount = await context.Students.CountAsync();
        
        // Return dynamic database count alongside other static mock KPI stats
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
            TotalEnrolled = 3248, // Static fallback if database has issues
            Attendance = 96.2, 
            PendingFees = 42500 
        });
    }
});

// 2. GET /api/StudentDirectory: Return dynamic database records in addition to message
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
});

// 3. GET /api/DetailedStudentProfile: Return live details from database for showcase
app.MapGet("/api/DetailedStudentProfile", async (EduIndDbContext context, ILogger<Program> logger) =>
{
    try
    {
        logger.LogInformation("API: Fetching Detailed Student Profile.");
        // Fetch the first student as the showcase profile
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
});

// --- RETAINED MOCK APIS (PREVENTS FRONTEND BREAKING) ---
app.MapGet("/api/StaffDirectory", () => new { Message = "Data for Staff Directory" });
app.MapGet("/api/AcademicHub", () => new { Message = "Data for Academic Hub" });
app.MapGet("/api/FeeManagement", () => new { Message = "Data for Fee Management" });
app.MapGet("/api/ParentStudentPortal", () => new { Message = "Data for Parent Portal" });

// --- Student CRUD API Endpoints ---
var studentsApi = app.MapGroup("/api/students");

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
