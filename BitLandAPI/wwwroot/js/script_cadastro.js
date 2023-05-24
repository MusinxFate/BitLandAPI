function redirecionarPagina() {
    // Redirecionar para a página de destino
    window.location.href = './index.html';
}

async function registrar() {
    event.preventDefault();
    
    var nome = document.querySelector("#login__name").value;
    var email = document.querySelector("#login__email").value;
    var telefone = document.querySelector("#login__telephone").value;
    var usuario = document.querySelector("#login__username").value;
    var senha = document.querySelector("#login__password").value;
    var confirmacaoSenha = document.querySelector("#login__password__confirm").value;

    userinfo = {
        "login": usuario,
        "password": senha,
        "nome": nome,
        "email": email,
        "telefone": telefone
    }
    if (senha === confirmacaoSenha) {
        const response = await fetch(window.location.origin + "/user/registrar", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*' 
            },
            body: JSON.stringify(userinfo)
        }).then(function (data) {
            return data.json();
        }).then(async function (data) {
            await fazerLogin(userinfo.login, userinfo.password);
        })
    }
    else{
        alert("Falha ao registrar.");
    }
}

async function fazerLogin(username, password) {
    var data = {
        "login": username,
        "password": password,
        "nome": "string",
        "email": "string",
        "telefone": "string"
    }

    if (username.length > 0) {
        const response = await fetch(window.location.origin + "/user/login", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': '*/*'
                },
                body: JSON.stringify(data)
            },
        ).then(function (data) {
            return data.json();
        }).then(function (data) {
            console.log(data);
            dataTest = data;
            localStorage.setItem('userjwt', data["JWT"])
            localStorage.setItem('ClienteId', data["ClienteId"])
        })

        if (localStorage.getItem("userjwt") != null) {
            redirecionarPaginaLogin();
        }
    }
}

function redirecionarPaginaLogin() {
    window.location.href = '../index.html';
}