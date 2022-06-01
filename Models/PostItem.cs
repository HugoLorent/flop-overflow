using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlopOverflow.Models
{
    public class PostItem
    {
        public long Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public long Likes { get; set; }
        public DateTime Date { get; set; }
        public bool Resolved { get; set; }
        public UserItem UserPost { get; set; }
    }
}
