using System.ComponentModel.DataAnnotations;

namespace Aiking.Dtos
{
    public class SignUpDto
    {
        public string FullName { get; set; } = null!;
        [Required, EmailAddress]
        public string Email { get; set; } = null!;
        public string Password { get; set; } = null!;
    }
}
