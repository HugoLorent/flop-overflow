using FlopOverflow.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlopOverflow.Models
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
            // Tables
            modelBuilder.Entity<UserItem>().ToTable("User");
            modelBuilder.Entity<PostItem>().ToTable("Post");
            modelBuilder.Entity<CommentItem>().ToTable("Comment");

            // Users
            modelBuilder.Entity<UserItem>().Property(u => u.Id).HasColumnType("int(11)").UseMySqlIdentityColumn();
            modelBuilder.Entity<UserItem>().Property(u => u.Login).HasColumnType("varchar(255)").IsRequired();
            modelBuilder.Entity<UserItem>().Property(u => u.Pwd).HasColumnType("narchar(255)").IsRequired();

            modelBuilder.Entity<UserItem>().HasKey(u => u.Id).HasName("PRIMARY");

            // Posts
            modelBuilder.Entity<PostItem>().Property(p => p.Id).HasColumnType("int").UseMySqlIdentityColumn();
            modelBuilder.Entity<PostItem>().Property(p => p.Title).HasColumnType("varchar(255)").IsRequired();
            modelBuilder.Entity<PostItem>().Property(p => p.Content).HasColumnType("varchar(255)").IsRequired();
            modelBuilder.Entity<PostItem>().Property(p => p.Likes).HasColumnType("int(11)").IsRequired();
            modelBuilder.Entity<PostItem>().Property(p => p.Date).HasColumnType("datetime").IsRequired();
            modelBuilder.Entity<PostItem>().Property(p => p.Resolved).HasColumnType("tinyint(1)").IsRequired();
            modelBuilder.Entity<PostItem>().Property(p => p.User_id).HasColumnType("int(11)").IsRequired();

            modelBuilder.Entity<PostItem>().HasKey(u => u.Id).HasName("PRIMARY");

            // Comments
            modelBuilder.Entity<CommentItem>().Property(p => p.Id).HasColumnType("int").UseMySqlIdentityColumn();
            modelBuilder.Entity<CommentItem>().Property(p => p.Content).HasColumnType("varchar(255)").IsRequired();
            modelBuilder.Entity<CommentItem>().Property(p => p.Likes).HasColumnType("int(11)").IsRequired();
            modelBuilder.Entity<CommentItem>().Property(p => p.Date).HasColumnType("datetime").IsRequired();
            modelBuilder.Entity<CommentItem>().Property(p => p.User_id).HasColumnType("int(11)").IsRequired();
            modelBuilder.Entity<CommentItem>().Property(p => p.Post_id).HasColumnType("int(11)").IsRequired();

            modelBuilder.Entity<CommentItem>().HasKey(u => u.Id).HasName("PRIMARY");

        }

    }
}
