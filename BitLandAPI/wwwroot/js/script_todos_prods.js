var produtos = [];
var produtos = [];

const loadPagina = async () => {
    await checkJwt();
    checkLogin();
    await getProducts();
    // getProducts();
}

async function checkLogin() {
    if (localStorage.getItem("userjwt") != null)
    {
        var response = await fetch("/clientes/" + localStorage.getItem("ClienteId"));
        const data = await response.json();
        user = JSON.parse(JSON.stringify(data));
        var loginbutton = document.querySelector("#userInfo");
        loginbutton.href = "";
    }
    else
    {
        document.querySelector("#userInfo").href = window.location.origin.toString() + "/pages/login_bitland.html"
    }
}

const checkJwt = async () => {
    if (localStorage.getItem("userjwt") == null) {
        console.log("Usuário não logado.");
    } else {
        console.log("Usuário logado.")
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
        liProduto.className = "itens"
        var aLinkProduto = document.createElement("a");
        aLinkProduto.href = "";
        aLinkProduto.className = "aTagProduto";
        var imgProduto = document.createElement("img");
        imgProduto.src = window.location.origin + a.pathImage;
        imgProduto.alt = a.descricao;
        imgProduto.className = 'imgProduto';
        var h3NomeProduto = document.createElement("h3");
        h3NomeProduto.innerText = a.nome;
        h3NomeProduto.className = 'nomeProduto';
        var pPreco = document.createElement("p");
        pPreco.className = "price";
        pPreco.innerText = (a.preco - (a.promocao / 100 * a.preco)).toFixed(2);

        aLinkProduto.appendChild(imgProduto);
        aLinkProduto.appendChild(h3NomeProduto);
        aLinkProduto.appendChild(pPreco);
        liProduto.appendChild(aLinkProduto);
        document.querySelector("#Grid").appendChild(liProduto);
    });
}


window.onload = () => loadPagina();