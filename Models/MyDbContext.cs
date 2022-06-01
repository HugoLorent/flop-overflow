using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlopOverflow.Models.Comment
{
    public class MyDbContext : DbContext
    {

        public DbSet<UserItem> Users { get; set; }
        public DbSet<PostItem> Posts { get; set; }
        public DbSet<CommentItem> Comments { get; set; }

        public MyDbContext (DbContextOptions<MyDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Map entities to tables  
            modelBuilder.Entity<UserItem>().ToTable("User");
            modelBuilder.Entity<PostItem>().ToTable("Post");
            modelBuilder.Entity<CommentItem>().ToTable("Comment");

            modelBuilder.Entity<UserItem>().Property(ug => ug.Id).HasColumnType("int").UseMySqlIdentityColumn().IsRequired();
            modelBuilder.Entity<UserItem>().Property(ug => ug.Login).HasColumnType("nvarchar(255)").IsRequired();
            modelBuilder.Entity<UserItem>().Property(ug => ug.Pwd).HasColumnType("nvarchar(255)").IsRequired();
        }

    }
}
