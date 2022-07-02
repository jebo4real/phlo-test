using Microsoft.EntityFrameworkCore;
using phlo_test_server.Models;

namespace phlo_test_server.DBContext
{
    public class SaleDBContext: DbContext
    {
        public SaleDBContext(DbContextOptions<SaleDBContext> options)
            : base(options)
        {

        }

        public DbSet<Product> Product { get; set; }
        public DbSet<SaleOrder> SaleOrder { get; set; }
    }
}
