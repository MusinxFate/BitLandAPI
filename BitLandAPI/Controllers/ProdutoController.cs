using BitLandAPI.Model;
using BitLandAPI.Repository;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BitLandAPI.Controllers;

[Route("produtos")]
public class ProdutoController : Controller
{
    private BitLandDBContext _context = new BitLandDBContext();

    public ProdutoController(BitLandDBContext context)
    {
        _context = context;
    }

    // GET
    [HttpGet("")]
    public async Task<IActionResult> GetProdutos()
    {
        return Ok(await _context.Produtos.ToListAsync());
    }

    [HttpGet("{id}")]
    [ProducesResponseType(200)]
    [ProducesResponseType(404)]
    public async Task<IActionResult> GetProduto(int id)
    {
        var produto = await _context.Produtos.FirstOrDefaultAsync(a => a.id_produto == id);
        if (produto != null)
            return Ok(produto);

        return NotFound("Produto não encontrado.");
    }

    [HttpGet("destaques")]
    [ProducesResponseType(200)]
    [ProducesResponseType(404)]
    public async Task<IActionResult> GetProdutosDestaque()
    {
        var produtosDestaque = await _context.Produtos.Where(a => a.destaque == true).ToListAsync();
        if (produtosDestaque != null)
            return Ok(produtosDestaque);

        return NotFound("Sem produtos de destaque");
    }

    [HttpPost("")]
    [ProducesResponseType(201)]
    [ProducesResponseType(400)]
    public async Task<IActionResult> CreateProduto(Produto produto)
    {
        try
        {
            _context.Produtos.Add(produto);
            return Ok(await _context.SaveChangesAsync());
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return BadRequest();
        }

        return new ObjectResult(produto) { StatusCode = 201 };
    }

    [HttpPut("")]
    [ProducesResponseType(201)]
    [ProducesResponseType(400)]
    public async Task<IActionResult> UpdateProduto(Produto produto)
    {
        var produtoDb = _context.Produtos.FirstOrDefault(a => a.id_produto == produto.id_produto);
        if (produtoDb != null)
        {
            return new ObjectResult(produto) { StatusCode = 201 };
        }

        return BadRequest();
    }

    [HttpDelete("{id}")]
    [ProducesResponseType(201)]
    [ProducesResponseType(400)]
    public async Task<IActionResult> DeleteProduto(int id)
    {
        var produtoDb = _context.Produtos.FirstOrDefault(a => a.id_produto == id);
        if (produtoDb != null)
        {
            _context.Produtos.Remove(produtoDb);
            await _context.SaveChangesAsync();
            return Accepted();
        }

        return BadRequest();
    }
}