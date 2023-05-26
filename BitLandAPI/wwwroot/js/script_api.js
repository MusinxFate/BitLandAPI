let produtos = [];
let produtospromocao = [];


window.addEventListener('DOMContentLoaded', function () {
    let btnMouses = document.getElementById('mouses');
    let btnTeclados = document.getElementById('teclados');
    let btnMonitores = document.getElementById('monitores');
    let btnGabinetes = document.getElementById('gabinetes');
    let btnHeadsets = document.getElementById('headsets');
    let btnPromocoes = document.getElementById('promocoes');
    let btnDestaques = document.getElementById('destaques');
    let btnTodosProdutos = document.getElementById('todosProdutos');
    let h3Element = document.getElementById('pageTitle');

    btnMouses.addEventListener('click', function () {
        h3Element.innerText = 'Mouses';
    });

    btnTeclados.addEventListener('click', function () {
        h3Element.innerText = 'Teclados';
    });

    btnMonitores.addEventListener('click', function () {
        h3Element.innerText = 'Monitores';
    });

    btnGabinetes.addEventListener('click', function () {
        h3Element.innerText = 'Gabinetes';
    });

    btnHeadsets.addEventListener('click', function () {
        h3Element.innerText = 'Headsets';
    });

    btnPromocoes.addEventListener('click', function () {
        h3Element.innerText = 'Promoções';
    });
    btnDestaques.addEventListener('click', function () {
        h3Element.innerText = 'Destaques';
    });

    btnTodosProdutos.addEventListener('click', function () {
        h3Element.innerText = 'Todos Produtos';
    });
});

const loadPagina = async () => {
    let load = document.getElementById('cubeloading');
    setTimeout(async function () {
        await checkJwt();
        checkLogin();
        await getProdutosDestaque();
        load.style.display = 'none';
    }, 1500);

}

async function checkLogin() {
    if (localStorage.getItem("userjwt") != null) {
        let response = await fetch("/clientes/" + localStorage.getItem("ClienteId"));
        const data = await response.json();
        user = JSON.parse(JSON.stringify(data));
        let loginbutton = document.querySelector("#userInfo");
        loginbutton.href = "";
    } else {
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

const getProdutosDestaque = async () => {
    const response = await fetch("/produtos/destaques", {
        headers: {
            "ngrok-skip-browser-warning": "any"
        }
    });
    const data = await response.json();
    produtos = JSON.parse(JSON.stringify(data));
    atualizarProdutos();
}

const getTodosProdutos = async () => {
    const response = await fetch("/produtos", {
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
        liProduto.className = "itens"
        let aLinkProduto = document.createElement("a");
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
        let btnEditar = document.createElement("button");
        btnEditar.innerText = "Editar";
        btnEditar.className = "btnEditar";
        btnEditar.addEventListener("click", function () {
            $(document).ready(function () {
                $('#myModal').modal('show');
            });
        });


        aLinkProduto.appendChild(imgProduto);
        aLinkProduto.appendChild(h3NomeProduto);
        aLinkProduto.appendChild(pPreco);
        aLinkProduto.appendChild(btnEditar);
        liProduto.appendChild(aLinkProduto);
        document.querySelector("#Grid").appendChild(liProduto);
    });
}

const getProdutosPromocao = async () => {
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
    document.querySelector("#Grid").innerHTML = "";
    produtospromocao.forEach(a => {
        let liProdutoPromocao = document.createElement("li");
        let aLinkProdutoPromocao = document.createElement("a");
        aLinkProdutoPromocao.href = "#";
        aLinkProdutoPromocao.className = 'aTagProduto'
        let imgProduto = document.createElement("img");
        imgProduto.src = window.location.origin + a.pathImage;
        imgProduto.alt = a.descricao;
        imgProduto.className = 'imgProduto';
        let h3NomeProdutoPromocao = document.createElement("h3");
        h3NomeProdutoPromocao.innerText = a.nome;
        h3NomeProdutoPromocao.className = 'nomeProduto'
        let pPrecoNormal = document.createElement("p");
        pPrecoNormal.className = "price-old";
        pPrecoNormal.innerText = a.preco;
        let pPrecoDesconto = document.createElement("p");
        pPrecoDesconto.className = "price-new";
        pPrecoDesconto.innerText = (a.preco - (a.promocao / 100 * a.preco)).toFixed(2);
        let btnEditar = document.createElement("button");
        btnEditar.innerText = "Editar";
        btnEditar.className = "btnEditar";
        btnEditar.addEventListener("click", function () {
            $(document).ready(function () {
                $('#myModal').modal('show');
            });
        });
        
        
        aLinkProdutoPromocao.appendChild(imgProduto);
        aLinkProdutoPromocao.appendChild(h3NomeProdutoPromocao);
        aLinkProdutoPromocao.appendChild(pPrecoNormal);
        aLinkProdutoPromocao.appendChild(pPrecoDesconto);
        aLinkProdutoPromocao.appendChild(btnEditar);
        liProdutoPromocao.appendChild(aLinkProdutoPromocao);
        document.querySelector("#Grid").appendChild(liProdutoPromocao);
    })
}

async function filtrarCategoria(categoriaNum) {
    const response = await fetch(window.location.origin + "/produtos/categoria/" + categoriaNum, {
        headers: {
            "ngrok-skip-browser-warning": "any"
        }
    });
    const data = await response.json();
    produtos = JSON.parse(JSON.stringify(data));
    document.querySelector("#Grid").innerHTML = ""
    load = document.getElementById('cubeloading');
    load.style.display = 'block'
    setTimeout(async function () {
        await atualizarProdutos();
        load.style.display = 'none';
    }, 1500);
}

window.onload = () => loadPagina();