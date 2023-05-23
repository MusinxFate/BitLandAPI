using BitLandAPI.Model;
using BitLandAPI.Repository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BitLandAPI.Controllers;

[Route("clientes/")]
public class ClienteController : Controller
{
    private BitLandDBContext _context = new BitLandDBContext();

    public ClienteController(BitLandDBContext context)
    {
        _context = context;
    }

    [HttpGet("")]
    public async Task<IActionResult> GetClientes()
    {
        return Ok(await _context.Clientes.ToListAsync());
    }

    [HttpGet("{id}")]
    [ProducesResponseType(200)]
    [ProducesResponseType(404)]
    public async Task<IActionResult> GetCliente(int id)
    {
        var cliente = await _context.Clientes.FirstOrDefaultAsync(a => a.id_cliente == id);
        if (cliente != null)
            return Ok(cliente);

        return NotFound("Cliente não encontrado");
    }

    [HttpPost]
    [ProducesResponseType(201)]
    [ProducesResponseType(400)]
    public async Task<IActionResult> CreateCliente(Cliente cliente)
    {
        try
        {
            _context.Clientes.Add(cliente);
            await _context.SaveChangesAsync();
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return BadRequest();
        }

        return new ObjectResult(cliente) { StatusCode = 201 };
    }

    [HttpPut("")]
    [ProducesResponseType(201)]
    [ProducesResponseType(400)]
    public async Task<IActionResult> UpdateCliente(Cliente cliente)
    {
        var clienteDb = await _context.Clientes.FirstOrDefaultAsync(a => a.id_cliente == cliente.id_cliente);
        if (clienteDb != null)
        {
            
            return new ObjectResult(cliente) { StatusCode = 201 };
        }

        return BadRequest();
    }

    [HttpDelete("{id}")]
    [ProducesResponseType(201)]
    [ProducesResponseType(400)]
    public async Task<IActionResult> DeleteCliente(int id)
    {
        var clienteDb = await _context.Clientes.FirstOrDefaultAsync(a => a.id_cliente == id);
        if (clienteDb != null)
        {
            _context.Clientes.Remove(clienteDb);
            await _context.SaveChangesAsync();
            return Accepted();
        }

        return BadRequest();
    }
}