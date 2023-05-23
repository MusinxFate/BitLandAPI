function validarLogin() {
    // Obter os valores dos campos de nome de usuário e senha
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    console.log(username);
    console.log(password);

    // Validação simples (exemplo)
    if (username && password) {
        // Login válido, redirecionar para a página de destino
        window.location.href = '../pages/app.html';
    } else {
        // Exibir mensagem de erro
        alert('Nome de usuário ou senha inválidos!');
    }
}

function redirecionarPagina() {
    // Redirecionar para a página de destino
    window.location.href = './index.html';
}