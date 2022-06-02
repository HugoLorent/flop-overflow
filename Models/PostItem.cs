using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace FlopOverflow.Models
{
    public class PostItem
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public long Likes { get; set; }
        public DateTime Date { get; set; }
        public bool Resolved { get; set; }
        public int User_id { get; set; }
        [ForeignKey("User_id")]
        public UserItem User { get; set; }
    }
}
