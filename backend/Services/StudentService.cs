using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using backend.DTOs;
using backend.Models;
using backend.Repositories;

namespace backend.Services
{
    public class StudentService : IStudentService
    {
        private readonly IStudentRepository _repository;
        private readonly ILogger<StudentService> _logger;

        public StudentService(IStudentRepository repository, ILogger<StudentService> logger)
        {
            _repository = repository;
            _logger = logger;
        }

        public async Task<IEnumerable<StudentDto>> GetAllStudentsAsync()
        {
            _logger.LogInformation("Service: Fetching all students.");
            var students = await _repository.GetAllAsync();
            return students.Select(MapToDto);
        }

        public async Task<StudentDto?> GetStudentByIdAsync(Guid id)
        {
            _logger.LogInformation("Service: Fetching student by ID: {StudentId}", id);
            var student = await _repository.GetByIdAsync(id);
            if (student == null)
            {
                _logger.LogWarning("Service: Student with ID {StudentId} was not found.", id);
                return null;
            }
            return MapToDto(student);
        }

        public async Task<StudentDto> CreateStudentAsync(CreateStudentDto createStudentDto)
        {
            _logger.LogInformation("Service: Processing creation of new student with Email: {Email}", createStudentDto.Email);
            var student = new Student
            {
                FirstName = createStudentDto.FirstName.Trim(),
                LastName = createStudentDto.LastName.Trim(),
                Email = createStudentDto.Email.Trim(),
                Grade = createStudentDto.Grade.Trim(),
                AdmissionDate = createStudentDto.AdmissionDate
            };

            var createdStudent = await _repository.AddAsync(student);
            _logger.LogInformation("Service: Student created successfully with ID: {StudentId}", createdStudent.Id);
            return MapToDto(createdStudent);
        }

        public async Task<StudentDto?> UpdateStudentAsync(Guid id, UpdateStudentDto updateStudentDto)
        {
            _logger.LogInformation("Service: Processing update for student with ID: {StudentId}", id);
            var student = new Student
            {
                Id = id,
                FirstName = updateStudentDto.FirstName.Trim(),
                LastName = updateStudentDto.LastName.Trim(),
                Email = updateStudentDto.Email.Trim(),
                Grade = updateStudentDto.Grade.Trim(),
                AdmissionDate = updateStudentDto.AdmissionDate
            };

            var updatedStudent = await _repository.UpdateAsync(student);
            if (updatedStudent == null)
            {
                _logger.LogWarning("Service: Failed to update student. ID {StudentId} was not found.", id);
                return null;
            }

            _logger.LogInformation("Service: Student with ID {StudentId} updated successfully.", id);
            return MapToDto(updatedStudent);
        }

        public async Task<bool> DeleteStudentAsync(Guid id)
        {
            _logger.LogInformation("Service: Requesting deletion of student with ID: {StudentId}", id);
            var result = await _repository.DeleteAsync(id);
            if (!result)
            {
                _logger.LogWarning("Service: Failed to delete student. ID {StudentId} was not found.", id);
            }
            else
            {
                _logger.LogInformation("Service: Student with ID {StudentId} deleted successfully.", id);
            }
            return result;
        }

        public async Task<bool> IsEmailRegisteredAsync(string email, Guid? excludeId = null)
        {
            _logger.LogInformation("Service: Checking uniqueness of email: {Email}.", email);
            return await _repository.EmailExistsAsync(email, excludeId);
        }

        private static StudentDto MapToDto(Student student)
        {
            return new StudentDto
            {
                Id = student.Id,
                FirstName = student.FirstName,
                LastName = student.LastName,
                Email = student.Email,
                Grade = student.Grade,
                AdmissionDate = student.AdmissionDate,
                CreatedAt = student.CreatedAt
            };
        }
    }
}
