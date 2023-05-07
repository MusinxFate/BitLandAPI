using System.ComponentModel.DataAnnotations;

namespace BitLandAPI.Model;

public class Cliente
{
    [Key]
    public int id_cliente { get; set; }
    public string nome { get; set; }
    public string email { get; set; }
    public string telefone { get; set; }
}