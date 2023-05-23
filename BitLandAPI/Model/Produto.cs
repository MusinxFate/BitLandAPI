using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace BitLandAPI.Model;

public class Produto
{
    [Key] public int id_produto { get; set; }
    [MaxLength(120)] [NotNull] public string nome { get; set; }
    [MaxLength(800)] public string descricao { get; set; }
    [NotNull] public double preco { get; set; }
    [NotNull] public double promocao { get; set; }
    [MaxLength(255)] public string? pathImage { get; set; }
    public Categoria categoria { get; set; }
    public bool destaque { get; set; }
}

public enum Categoria
{
    Teclado = 1,
    Mouse = 2,
    Monitor = 3,
    Headset = 4,
    Gabinete = 5
}

public class ProdutoDTO : Produto
{
    
}