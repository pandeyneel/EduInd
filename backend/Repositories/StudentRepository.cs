using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using backend.Data;
using backend.Models;

namespace backend.Repositories
{
    public class StudentRepository : IStudentRepository
    {
        private readonly EduIndDbContext _context;
        private readonly ILogger<StudentRepository> _logger;

        public StudentRepository(EduIndDbContext context, ILogger<StudentRepository> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<IEnumerable<Student>> GetAllAsync()
        {
            try
            {
                _logger.LogInformation("Retrieving all students from database.");
                return await _context.Students
                    .AsNoTracking()
                    .OrderByDescending(s => s.CreatedAt)
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while retrieving all students from database.");
                throw;
            }
        }

        public async Task<Student?> GetByIdAsync(Guid id)
        {
            try
            {
                _logger.LogInformation("Retrieving student with ID: {StudentId} from database.", id);
                return await _context.Students.FindAsync(id);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while retrieving student with ID: {StudentId} from database.", id);
                throw;
            }
        }

        public async Task<Student> AddAsync(Student student)
        {
            try
            {
                student.Id = Guid.NewGuid();
                student.CreatedAt = DateTime.UtcNow;
                student.AdmissionDate = DateTime.SpecifyKind(student.AdmissionDate, DateTimeKind.Utc);

                _logger.LogInformation("Adding new student with Email: {Email} to database.", student.Email);
                _context.Students.Add(student);
                await _context.SaveChangesAsync();
                _logger.LogInformation("Student added successfully with ID: {StudentId}.", student.Id);
                return student;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while adding student with Email: {Email} to database.", student.Email);
                throw;
            }
        }

        public async Task<Student?> UpdateAsync(Student student)
        {
            try
            {
                _logger.LogInformation("Updating student with ID: {StudentId} in database.", student.Id);
                var existing = await _context.Students.FindAsync(student.Id);
                if (existing == null)
                {
                    _logger.LogWarning("Student with ID: {StudentId} not found for update.", student.Id);
                    return null;
                }

                existing.FirstName = student.FirstName;
                existing.LastName = student.LastName;
                existing.Email = student.Email;
                existing.Grade = student.Grade;
                existing.AdmissionDate = DateTime.SpecifyKind(student.AdmissionDate, DateTimeKind.Utc);

                await _context.SaveChangesAsync();
                _logger.LogInformation("Student with ID: {StudentId} updated successfully.", student.Id);
                return existing;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while updating student with ID: {StudentId} in database.", student.Id);
                throw;
            }
        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            try
            {
                _logger.LogInformation("Deleting student with ID: {StudentId} from database.", id);
                var student = await _context.Students.FindAsync(id);
                if (student == null)
                {
                    _logger.LogWarning("Student with ID: {StudentId} not found for deletion.", id);
                    return false;
                }

                _context.Students.Remove(student);
                await _context.SaveChangesAsync();
                _logger.LogInformation("Student with ID: {StudentId} deleted successfully from database.", id);
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while deleting student with ID: {StudentId} from database.", id);
                throw;
            }
        }

        public async Task<bool> EmailExistsAsync(string email, Guid? excludeId = null)
        {
            try
            {
                var query = _context.Students.AsNoTracking();
                if (excludeId.HasValue)
                {
                    query = query.Where(s => s.Id != excludeId.Value);
                }
                return await query.AnyAsync(s => s.Email.ToLower() == email.ToLower());
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while checking if email: {Email} exists in database.", email);
                throw;
            }
        }
    }
}
