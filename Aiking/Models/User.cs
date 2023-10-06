using Microsoft.AspNetCore.Identity;

namespace Aiking.Models
{
    public class User : IdentityUser
    {
        public string? Password { get; set; }
        public string? FullName { get; set; }
        public double? Point { get; set; }
        public bool Locked { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
