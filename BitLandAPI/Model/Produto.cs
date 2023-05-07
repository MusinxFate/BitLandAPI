using System.ComponentModel.DataAnnotations;

namespace BitLandAPI.Model;

public class Produto
{
    [Key]
    public int id_produto { get; set; }
    [MaxLength(120)]
    public string nome { get; set; }
    [MaxLength(800)]
    public string descricao { get; set; }
    public double preco { get; set; }
    public string base64image { get; set; }
}