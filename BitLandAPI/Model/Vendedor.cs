using System.ComponentModel.DataAnnotations;

namespace BitLandAPI.Model;

public class Vendedor
{
    [Key] 
    public int id_vendedor { get; set; }
    public string nome { get; set; }
    public string email { get; set; }
    public string telefone { get; set; }
}