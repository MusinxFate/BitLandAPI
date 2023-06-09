window.onload = () => loadPaginaProdCadastro();

const loadPaginaProdCadastro = async() => {
    document.getElementById("formulario").addEventListener("submit", async function (event) {
        event.preventDefault();
        // Obter os valores dos campos
        var nome = document.getElementById("nome").value;
        var descricao = document.getElementById("descricao").value;
        var preco = document.getElementById("preco").value;

        var imagem = document.getElementById("imagem").files[0];

        var categoria = document.getElementById("categoria").value;
        var destaque = document.getElementById("destaque").checked;

        produto = {
            "nome": nome,
            "descricao": descricao,
            "preco": preco,
            "categoria": categoria,
            "destaque": destaque
        }

        // await fetch(window.location.origin + "/produtos/upload", {
        //     method: "POST",
        //     body: imagem,
        //     headers: {
        //         'Content-Type': 'multipart/form-data',
        //         'Accept': '*/*'
        //     }
        // }).then(function (data) {
        //     return data.json();
        // })
        
        const response = await fetch(window.location.origin + "/produtos/", {
            method: "POST",
            body: JSON.stringify(produto),
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*'
            }
        }).then(async function (data) {
            var dataResponse = await data.json()
            console.log(dataResponse)
            return dataResponse;
        })
    });
}