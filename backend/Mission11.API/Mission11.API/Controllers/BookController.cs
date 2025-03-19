﻿using Microsoft.AspNetCore.Mvc;
using Mission11.API.Data;
using System.Linq;

namespace Mission11.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly BookDbContext _bookContext;
        public BookController(BookDbContext temp) => _bookContext = temp;

        [HttpGet("AllBooks")]
        public IActionResult GetBooks(int pageSize = 5, int pageNum = 1, string? sortBy = null)
        {
            var query = _bookContext.Books.AsQueryable();

            if (!string.IsNullOrEmpty(sortBy))
            {
                query = sortBy.ToLower() switch
                {
                    "title" => query.OrderBy(b => b.Title),
                    _ => query.OrderBy(b => b.Title) 
                };
            }

            var bookList = query
                .Skip((pageNum - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            var totalNumBooks = _bookContext.Books.Count();

            var listAll = new
            {
                Books = bookList,
                TotalNumBooks = totalNumBooks
            };

            return Ok(listAll);
        }
    }
}
