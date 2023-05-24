using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using BitLandAPI.Model;
using BitLandAPI.Repository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using Org.BouncyCastle.Crypto.Generators;

namespace BitLandAPI.Controllers;

[Route("user/")]
public class UserController : Controller
{
    public IConfiguration _configuration;
    private BitLandDBContext _context = new BitLandDBContext();

    public UserController(IConfiguration configuration, BitLandDBContext context)
    {
        _context = context;
        _configuration = configuration;
    }

    [HttpPost]
    [Route("login")]
    public async Task<IActionResult> Autenticar([FromBody] UserInfosDTO userInfos)
    {
        var user = await GetUsuario(userInfos.login, userInfos.password);
        
        if (user != null)
        {
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, _configuration["Jwt:Subject"]),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                new Claim("Id", user.id_cliente.ToString()),
                new Claim("Nome", user.nome),
                new Claim("Login", user.login)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var logar = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(_configuration["Jwt:Issuer"],
                _configuration["Jwt:Audience"], claims,
                expires: DateTime.Now.AddHours(2), signingCredentials: logar);

            var objRetorno = new RetornoLoginDTO()
            {
                JWT = new JwtSecurityTokenHandler().WriteToken(token),
                ClienteId = user.id_cliente
            };

            var objRetornoJSON = JsonConvert.SerializeObject(objRetorno);
            return Ok(objRetornoJSON);
        }

        return BadRequest("Falha ao realizar o login.");
    }

    [HttpPost]
    [ProducesResponseType(201)]
    [ProducesResponseType(400)]
    [Route("registrar")]
    public async Task<IActionResult> Registrar([FromBody] UserInfosDTO userInfos)
    {
        var user = await _context.Clientes.FirstOrDefaultAsync(a => a.login == userInfos.login);
        if (user != null)
            return BadRequest("Usuário já existente.");

        var cliente = new Cliente()
        {
            login = userInfos.login,
            senha = BCrypt.Net.BCrypt.HashPassword(userInfos.password),
            nome = userInfos.nome,
            email = userInfos.email,
            telefone = userInfos.telefone
        };

        _context.Clientes.Add(cliente);
        await _context.SaveChangesAsync();

        return new ObjectResult(cliente) { StatusCode = 201 };
    }

    [NonAction]
    private async Task<Cliente> GetUsuario(string login, string senha)
    {
        var getUser = await _context.Clientes.FirstOrDefaultAsync(u => u.login == login);
        if (getUser != null && BCrypt.Net.BCrypt.Verify(senha, getUser.senha))
            return getUser;

        return null;
    }

    public class UserInfosDTO
    {
        public string login { get; set; }
        public string password { get; set; }
        public string nome { get; set; }
        public string email { get; set; }
        public string telefone { get; set; }
    }

    public class RetornoLoginDTO
    {
        public string JWT { get; set; }
        public int ClienteId { get; set; }
    }
}