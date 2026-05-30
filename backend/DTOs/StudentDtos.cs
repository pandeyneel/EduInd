using System;
using System.ComponentModel.DataAnnotations;

namespace backend.DTOs
{
    public class StudentDto
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Grade { get; set; } = string.Empty;
        public DateTime AdmissionDate { get; set; }
        public DateTime CreatedAt { get; set; }
    }

    public class CreateStudentDto
    {
        [Required(ErrorMessage = "First name is required.")]
        [StringLength(50, ErrorMessage = "First name cannot exceed 50 characters.")]
        public string FirstName { get; set; } = string.Empty;

        [Required(ErrorMessage = "Last name is required.")]
        [StringLength(50, ErrorMessage = "Last name cannot exceed 50 characters.")]
        public string LastName { get; set; } = string.Empty;

        [Required(ErrorMessage = "Email is required.")]
        [EmailAddress(ErrorMessage = "Invalid email address format.")]
        [StringLength(100, ErrorMessage = "Email cannot exceed 100 characters.")]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "Grade is required.")]
        [StringLength(20, ErrorMessage = "Grade cannot exceed 20 characters.")]
        public string Grade { get; set; } = string.Empty;

        [Required(ErrorMessage = "Admission date is required.")]
        public DateTime AdmissionDate { get; set; }
    }

    public class UpdateStudentDto
    {
        [Required(ErrorMessage = "First name is required.")]
        [StringLength(50, ErrorMessage = "First name cannot exceed 50 characters.")]
        public string FirstName { get; set; } = string.Empty;

        [Required(ErrorMessage = "Last name is required.")]
        [StringLength(50, ErrorMessage = "Last name cannot exceed 50 characters.")]
        public string LastName { get; set; } = string.Empty;

        [Required(ErrorMessage = "Email is required.")]
        [EmailAddress(ErrorMessage = "Invalid email address format.")]
        [StringLength(100, ErrorMessage = "Email cannot exceed 100 characters.")]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "Grade is required.")]
        [StringLength(20, ErrorMessage = "Grade cannot exceed 20 characters.")]
        public string Grade { get; set; } = string.Empty;

        [Required(ErrorMessage = "Admission date is required.")]
        public DateTime AdmissionDate { get; set; }
    }
}
