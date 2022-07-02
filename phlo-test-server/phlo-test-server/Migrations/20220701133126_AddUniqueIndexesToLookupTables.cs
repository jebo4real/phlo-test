using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace phlo_test_server.Migrations
{
    public partial class AddUniqueIndexesToLookupTables : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Product_ProductName",
                table: "Product",
                column: "ProductName",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Product_ProductName",
                table: "Product");
        }
    }
}
