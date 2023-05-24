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
        }).then(function (data) {
            console.log(data);
        })
    }
    else{
        console.log("Falha ao registrar.");
    }
}