using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace phlo_test_server.Models
{
    [Index(nameof(ProductName), IsUnique = true)]
    public class Product
    {
        public int ProductId { get; set; }

        public string ProductName { get; set; }
    }
}