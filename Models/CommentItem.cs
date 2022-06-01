using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlopOverflow.Models
{
    public class CommentItem
    {
        public long Id { get; set; }
        public string Content { get; set; }
        public long Likes { get; set; }
        public DateTime Date { get; set; }
        public UserItem UserComment { get; set; }
        public PostItem PostComment { get; set; }
    }
}
