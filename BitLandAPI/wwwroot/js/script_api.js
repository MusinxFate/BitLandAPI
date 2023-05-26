let produtos = [];
let produtospromocao = [];

const loadPagina = async () => {
    await checkJwt();
    checkLogin();
    await getProductsDestaque();
    // getProductsPromocao();
}

async function checkLogin() {
    if (localStorage.getItem("userjwt") != null)
    {
        let response = await fetch("/clientes/" + localStorage.getItem("ClienteId"));
        const data = await response.json();
        user = JSON.parse(JSON.stringify(data));
        let loginbutton = document.querySelector("#userInfo");
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

const getProductsDestaque = async () => {
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
        let liProduto = document.createElement("li");
        liProduto.className = "itens";
        let aLinkProduto = document.createElement("a");
        aLinkProduto.href = "";
        aLinkProduto.className = "aTagProduto";
        let imgProduto = document.createElement("img");
        imgProduto.src = window.location.origin + a.pathImage;
        imgProduto.alt = a.descricao;
        imgProduto.className = 'imgProduto';
        let h3NomeProduto = document.createElement("h3");
        h3NomeProduto.innerText = a.nome;
        h3NomeProduto.className = 'nomeProduto';
        let pPreco = document.createElement("p");
        pPreco.className = "price";
        pPreco.innerText = (a.preco - (a.promocao / 100 * a.preco)).toFixed(2);

        aLinkProduto.appendChild(imgProduto);
        aLinkProduto.appendChild(h3NomeProduto);
        aLinkProduto.appendChild(pPreco);
        liProduto.appendChild(aLinkProduto);
        document.querySelector("#Grid").appendChild(liProduto);
    });
}

function atualizarProdutosPromocao() {
    document.querySelector("#Grid").innerHTML = "";
    produtospromocao.forEach(a => {
        let liProdutoPromocao = document.createElement("li");
        liProdutoPromocao.className = "itens";
        let aLinkProdutoPromocao = document.createElement("a");
        aLinkProdutoPromocao.href = "#";
        aLinkProdutoPromocao.className = "aTagProduto";
        let imgProduto = document.createElement("img");
        imgProduto.src = window.location.origin + a.pathImage;
        imgProduto.alt = a.descricao;
        imgProduto.className = 'imgProduto';
        let h3NomeProdutoPromocao = document.createElement("h3");
        h3NomeProdutoPromocao.innerText = a.nome;
        h3NomeProdutoPromocao.className = 'nomeProduto';
        let pPrecoNormal = document.createElement("p");
        pPrecoNormal.className = "price-old";
        pPrecoNormal.innerText = a.preco;
        let pPrecoDesconto = document.createElement("p");
        pPrecoDesconto.className = "price-new";
        pPrecoDesconto.innerText = (a.preco - (a.promocao / 100 * a.preco)).toFixed(2);

        aLinkProdutoPromocao.appendChild(imgProduto);
        aLinkProdutoPromocao.appendChild(h3NomeProdutoPromocao);
        aLinkProdutoPromocao.appendChild(pPrecoNormal);
        aLinkProdutoPromocao.appendChild(pPrecoDesconto);
        liProdutoPromocao.appendChild(aLinkProdutoPromocao);
        document.querySelector("#Grid").appendChild(liProdutoPromocao);
    })
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

async function getTodosProdutos() {
    const response = await fetch(window.location.origin + "/produtos", {
        headers: {
            
        }
    });
    const data = await response.json();
    produtos = JSON.parse(JSON.stringify(data))
    atualizarProdutos();
}

window.onload = () => loadPagina();