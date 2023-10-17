using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Aikings.Migrations
{
    /// <inheritdoc />
    public partial class AddThumnail : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Thumnail",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Thumnail",
                table: "AspNetUsers");
        }
    }
}
