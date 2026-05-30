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

builder.Services.AddOpenApi();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();
app.UseCors("AllowFrontend");

// Mock Endpoints for the 7 screens
app.MapGet("/api/AdminDashboard", () => new { Message = "Data for Admin Dashboard", TotalEnrolled = 3248, Attendance = 96.2, PendingFees = 42500 });
app.MapGet("/api/StudentDirectory", () => new { Message = "Data for Student Directory" });
app.MapGet("/api/DetailedStudentProfile", () => new { Message = "Data for Detailed Student Profile" });
app.MapGet("/api/StaffDirectory", () => new { Message = "Data for Staff Directory" });
app.MapGet("/api/AcademicHub", () => new { Message = "Data for Academic Hub" });
app.MapGet("/api/FeeManagement", () => new { Message = "Data for Fee Management" });
app.MapGet("/api/ParentStudentPortal", () => new { Message = "Data for Parent Portal" });

app.Run();
