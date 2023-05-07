using BitLandAPI.Model;
using Microsoft.EntityFrameworkCore;

namespace BitLandAPI.Repository;

public class BitLandDBContext : DbContext
{
    private readonly IConfiguration _configuration;
    public BitLandDBContext()
    {
    }

    public BitLandDBContext(DbContextOptions<BitLandDBContext> options, IConfiguration configuration) : base(options)
    {
        _configuration = configuration;
    }

    public DbSet<Cliente> Clientes { get; set; }
    public DbSet<Produto> Produtos { get; set; }
    public DbSet<Vendedor> Vendedores { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseMySQL(_configuration.GetConnectionString("MySqlConnection"));
    }
}