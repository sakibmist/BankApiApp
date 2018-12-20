using System;
using System.ComponentModel.DataAnnotations;

namespace ProjectApi.Models
{
    public class Account
    {
        [Key]
        public long Id { get; set; }

        [Required]
        [StringLength(50)]
        public string FirstName { get; set; }

        [Required]
        [StringLength(50)]
        public string LastName { get; set; }

        [Required]
        [StringLength(50)]
        public string Email { get; set; }

        [Required]
        [StringLength(15)]
        public string MobileNo { get; set; }
        [Required]
        [StringLength(50)]
        public string AccountNo { get; set; }

        [Required]
        public decimal Balance { get; set; }

        [Required]
        public DateTime CreatedAt { get; set; } = DateTime.Now;

        public DateTime UpdatedAt { get; set; } = DateTime.Now;
    }
}