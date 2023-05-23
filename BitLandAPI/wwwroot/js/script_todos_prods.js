var produtos = [];

const loadPagina = async () => {
    checkLogin();
    getProducts();
}

async function checkLogin() {
    if (localStorage.getItem("userjwt") != null)
    {
        var response = await fetch("/clientes/" + localStorage.getItem("ClienteId"));
        const data = await response.json();
        user = JSON.parse(JSON.stringify(data));
        var loginbutton = document.querySelector("body > header > div > button.login-button > a");
        loginbutton.href = "";
        loginbutton.innerText = user.nome;
    }
}

const getProducts = async () => {
    const response = await fetch("/produtos/", {
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
        imgProduto.src = window.location.origin + a.pathImage;
        imgProduto.alt = a.descricao;
        imgProduto.className = 'imageDestaque';
        var h3NomeProduto = document.createElement("h3");
        h3NomeProduto.innerText = a.nome;
        var pPreco = document.createElement("p");
        pPreco.className = "price";
        pPreco.innerText = (a.preco - (a.promocao / 100 * a.preco)).toFixed(2);

        aLinkProduto.appendChild(imgProduto);
        aLinkProduto.appendChild(h3NomeProduto);
        aLinkProduto.appendChild(pPreco);
        liProduto.appendChild(aLinkProduto);
        document.querySelector("body > main > section > section > ul").appendChild(liProduto);
    });
}

window.onload = loadPagina();