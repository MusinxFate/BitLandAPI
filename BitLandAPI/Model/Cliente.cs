using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace BitLandAPI.Model;

public class Cliente
{
    [Key] public int id_cliente { get; set; }

    [Required] [MaxLength(80)] [NotNull] public string login { get; set; }

    [MaxLength(256)]
    [DataType(DataType.Password)]
    [NotNull]
    public string senha { get; set; }

    [MaxLength(120)] [NotNull] public string nome { get; set; }

    [MaxLength(80)]
    [NotNull]
    [EmailAddress]
    public string email { get; set; }

    [MaxLength(13)] [NotNull] public string telefone { get; set; }
}