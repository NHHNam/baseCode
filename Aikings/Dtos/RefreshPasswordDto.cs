using System.ComponentModel.DataAnnotations;

namespace Aikings.Dtos
{
    public class RefreshPasswordDto
    {
        [Required]
        [EmailAddress]
        public string? Email { get; set; }
    }
}
