var produtos = [];
var produtospromocao = [];

const loadPagina = async () => {
    await checkJwt();
    checkLogin();
    await getProducts();
    // getProductsPromocao();
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
    document.querySelector("#Grid").innerHTML = "";
    produtos.forEach(a => {
        var liProduto = document.createElement("li");
        liProduto.className = "itens"
        var aLinkProduto = document.createElement("a");
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
        var btnEditar = document.createElement("button");
        btnEditar.innerText = "Editar";
        btnEditar.className = "btnEditar";
        btnEditar.addEventListener("click", function() {
            $('#myModal').modal('show');
        });
        

        aLinkProduto.appendChild(imgProduto);
        aLinkProduto.appendChild(h3NomeProduto);
        aLinkProduto.appendChild(pPreco);
        aLinkProduto.appendChild(btnEditar);
        liProduto.appendChild(aLinkProduto);
        document.querySelector("#Grid").appendChild(liProduto);
    });
}

const getProductsPromocao = async () => {
    const response = await fetch("/produtos/promocoes", {
        headers: {
            "ngrok-skip-browser-warning": "any"
        }
    });
    const data = await response.json();
    produtospromocao = JSON.parse(JSON.stringify(data));
    atualizarProdutosPromocao();
}

function atualizarProdutosPromocao() {
    produtospromocao.forEach(a => {
        var liProdutoPromocao = document.createElement("li");
        var aLinkProdutoPromocao = document.createElement("a");
        aLinkProdutoPromocao.href = "#";
        var imgProduto = document.createElement("img");
        imgProduto.src = window.location.origin + a.pathImage;
        imgProduto.alt = a.descricao;
        imgProduto.className = 'imageDestaque';
        var h3NomeProdutoPromocao = document.createElement("h3");
        h3NomeProdutoPromocao.innerText = a.nome;
        var pPrecoNormal = document.createElement("p");
        pPrecoNormal.className = "price-old";
        pPrecoNormal.innerText = a.preco;
        var pPrecoDesconto = document.createElement("p");
        pPrecoDesconto.className = "price-new";
        pPrecoDesconto.innerText = (a.preco - (a.promocao / 100 * a.preco)).toFixed(2);

        aLinkProdutoPromocao.appendChild(imgProduto);
        aLinkProdutoPromocao.appendChild(h3NomeProdutoPromocao);
        aLinkProdutoPromocao.appendChild(pPrecoNormal);
        aLinkProdutoPromocao.appendChild(pPrecoDesconto);
        liProdutoPromocao.appendChild(aLinkProdutoPromocao);
        document.querySelector("body > div.container > main > section.promotions > ul").appendChild(liProdutoPromocao);
    })
}

async function filtrarCategoria(categoriaNum){
    const response = await fetch(window.location.origin + "/produtos/categoria/" + categoriaNum, {
        headers: {
            "ngrok-skip-browser-warning": "any"
        }
    });
    const data = await response.json();
    produtos = JSON.parse(JSON.stringify(data));
    atualizarProdutos();
}

window.onload = () => loadPagina();