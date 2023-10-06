using System.ComponentModel.DataAnnotations.Schema;

namespace Aiking.Models
{
    [Table("Payment")]
    public class Payment
    {
        public int Id { get; set; }
        public string? CardId { get; set; }
        public string? FullName { get; set; }
        public string? NameCard { get; set; }
        public DateTime createdAt { get; set; }
        public DateTime updatedAt { get; set; }
        public int UserID { get; set; }
    }
}
