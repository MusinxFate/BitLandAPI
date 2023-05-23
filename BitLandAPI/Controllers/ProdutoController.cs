using BitLandAPI.Model;
using BitLandAPI.Repository;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

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
    public async Task<IActionResult> CreateProduto([FromBody] Produto produto)
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
    }

    [HttpPut("")]
    [ProducesResponseType(201)]
    [ProducesResponseType(400)]
    public async Task<IActionResult> UpdateProduto(Produto produto)
    {
        var produtoDb = await _context.Produtos.FirstOrDefaultAsync(a => a.id_produto == produto.id_produto);
        if (produtoDb != null)
        {
            if (!produto.nome.IsNullOrEmpty())
                produtoDb.nome = (produto.nome == produtoDb.nome) ? produtoDb.nome : produto.nome;

            if (!produto.descricao.IsNullOrEmpty())
                produtoDb.descricao =
                    (produto.descricao == produtoDb.descricao) ? produtoDb.descricao : produto.descricao;

            produtoDb.categoria = (produto.categoria == produtoDb.categoria) ? produtoDb.categoria : produto.categoria;

            produtoDb.destaque = (produto.destaque == produtoDb.destaque) ? produtoDb.destaque : produto.destaque;

            produtoDb.promocao = (produto.promocao == produtoDb.promocao) ? produtoDb.promocao : produto.promocao;
            produtoDb.preco = (produto.preco == produtoDb.preco) ? produtoDb.preco : produto.preco;

            _context.SaveChangesAsync();
            return new ObjectResult(produtoDb) { StatusCode = 201 };
        }

        return BadRequest();
    }

    [HttpDelete("{id}")]
    [ProducesResponseType(201)]
    [ProducesResponseType(400)]
    public async Task<IActionResult> DeleteProduto(int id)
    {
        var produto = _context.Produtos.FirstOrDefault(a => a.id_produto == id);
        if (produto != null)
        {
            _context.Produtos.Remove(produto);
            await _context.SaveChangesAsync();
            return Accepted();
        }

        return BadRequest();
    }

    [HttpGet("promocoes")]
    [ProducesResponseType(200)]
    [ProducesResponseType(404)]
    public async Task<IActionResult> GetPromocoes()
    {
        var produtosPromocao = _context.Produtos.Where(a => a.promocao > 0);
        if (produtosPromocao != null)
        {
            return Ok(produtosPromocao);
        }

        return NotFound("Sem produtos em promoção.");
    }
}