function fazerLogin() {
    var username = document.getElementById('username').value;

    
    if (username !== '') {
        // Armazenar o nome de usuário na sessão ou em um cookie, se necessário
        // Aqui, apenas exibiremos o nome de usuário na tela
        usuarioLogado = username;

        // Redirecionar para a tela inicial
        window.location.href = '../app.html';

        console.log(usuarioLogado)
    }
    }
