using BitLandAPI.Model;
using BitLandAPI.Repository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BitLandAPI.Controllers;

[Route("vendedores")]
public class VendedorController : Controller
{
    private BitLandDBContext _context = new BitLandDBContext();

    public VendedorController(BitLandDBContext context)
    {
        _context = context;
    }

    // GET
    [HttpGet("")]
    [ProducesResponseType(200)]
    [ProducesResponseType(404)]
    public async Task<IActionResult> GetVendedores()
    {
        return Ok(await _context.Vendedores.ToListAsync());
    }

    [HttpGet("{id}")]
    [ProducesResponseType(200)]
    [ProducesResponseType(404)]
    public async Task<IActionResult> GetVendedor(int id)
    {
        return Ok(await _context.Vendedores.FirstOrDefaultAsync(a => a.id_vendedor == id));
    }

    [HttpPost]
    [ProducesResponseType(201)]
    [ProducesResponseType(400)]
    public async Task<IActionResult> CreateVendedor(Vendedor vendedor)
    {
        try
        {
            _context.Vendedores.Add(vendedor);
            await _context.SaveChangesAsync();
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return BadRequest();
        }

        return new ObjectResult(vendedor) { StatusCode = 201 };
    }

    [HttpPut("")]
    [ProducesResponseType(201)]
    [ProducesResponseType(400)]
    public async Task<IActionResult> UpdateVendedor(Vendedor vendedor)
    {
        var vendedorDb = await _context.Vendedores.FirstOrDefaultAsync(a => a.id_vendedor == vendedor.id_vendedor);
        if (vendedorDb != null)
        {
            vendedorDb.nome = (vendedorDb.nome == vendedor.nome) ? vendedorDb.nome : vendedor.nome;
            vendedorDb.email = (vendedorDb.email == vendedor.email) ? vendedorDb.email : vendedor.email;
            vendedorDb.telefone = (vendedorDb.telefone == vendedor.telefone) ? vendedorDb.telefone : vendedor.telefone;

            return new ObjectResult(vendedorDb) { StatusCode = 201 };
        }

        return BadRequest();
    }

    [HttpDelete("{id}")]
    [ProducesResponseType(201)]
    [ProducesResponseType(400)]
    public async Task<IActionResult> DeleteVendedor(int id)
    {
        var vendedorDb = await _context.Vendedores.FirstOrDefaultAsync(a => a.id_vendedor == id);
        if (vendedorDb != null)
        {
            _context.Vendedores.Remove(vendedorDb);
            await _context.SaveChangesAsync();
            return Accepted();
        }

        return BadRequest();
    }
}