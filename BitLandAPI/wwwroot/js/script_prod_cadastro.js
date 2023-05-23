document.getElementById("formulario").addEventListener("submit", function(event) {
    event.preventDefault();
  
    // Obter os valores dos campos
    var nome = document.getElementById("nome").value;
    var descricao = document.getElementById("descricao").value;
    var preco = document.getElementById("preco").value;
    var imagem = document.getElementById("imagem").value;
    var categoria = document.getElementById("categoria").value;
    var destaque = document.getElementById("destaque").checked;
  
    // Realizar o processamento ou envio dos dados
    // Exemplo:
    console.log("Nome: " + nome);
    console.log("Descrição: " + descricao);
    console.log("Preço: " + preco);
    console.log("Imagem: " + imagem);
    console.log("Categoria: " + categoria);
    console.log("Destaque: " + destaque);
  });
  