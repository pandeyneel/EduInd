using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using backend.DTOs;

namespace backend.Services
{
    public interface IStudentService
    {
        Task<IEnumerable<StudentDto>> GetAllStudentsAsync();
        Task<StudentDto?> GetStudentByIdAsync(Guid id);
        Task<StudentDto> CreateStudentAsync(CreateStudentDto createStudentDto);
        Task<StudentDto?> UpdateStudentAsync(Guid id, UpdateStudentDto updateStudentDto);
        Task<bool> DeleteStudentAsync(Guid id);
        Task<bool> IsEmailRegisteredAsync(string email, Guid? excludeId = null);
    }
}
