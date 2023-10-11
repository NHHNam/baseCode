using Microsoft.AspNetCore.Identity;

namespace Aikings.Authencation
{
    public class ApplicationUser : IdentityUser
    {
        public string? FullName { get; set; }
        public double? Point { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }
}
