using System.ComponentModel.DataAnnotations.Schema;

namespace Aiking.Models
{
    [Table("Post")]
    public class Post
    {
        public int Id { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public int UserId { get; set; }
        public DateTime createdAt { get; set; }
        public DateTime updatedAt { get; set; }
    }
}
