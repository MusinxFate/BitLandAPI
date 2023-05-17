var produtos = [];

const getProducts = async () => {
    const response = await fetch("/produtos/destaques", {
        headers: {
            "ngrok-skip-browser-warning": "any"
        }
    });

    const data = await response.json();

    produtos = JSON.parse(JSON.stringify(data));
    atualizarProdutos();
}

function atualizarProdutos() {
    produtos.forEach(a => {
        var liProduto = document.createElement("li");
        var aLinkProduto = document.createElement("a");
        aLinkProduto.href = "#";
        var imgProduto = document.createElement("img");
        imgProduto.src = document.URL.replace("/index.html#", "") + a.pathImage;
        imgProduto.className = 'imageDestaque';
        var h3NomeProduto = document.createElement("h3");
        h3NomeProduto.innerText = a.nome;
        var pPreco = document.createElement("p");
        pPreco.className = "price";
        pPreco.innerText = a.preco;

        aLinkProduto.appendChild(imgProduto);
        aLinkProduto.appendChild(h3NomeProduto);
        aLinkProduto.appendChild(pPreco);
        liProduto.appendChild(aLinkProduto);
        document.querySelector("body > div.container > main > section.Featured > ul").appendChild(liProduto);
    });
}

window.onload = getProducts();