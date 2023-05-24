dataTest = {};

$("#formlogin").find('input, textarea').on('keyup blur focus', function (e) {

    var $this = $(this),
        label = $this.prev('label');

    if (e.type === 'keyup') {
        if ($this.val() === '') {
            label.removeClass('active highlight');
        } else {
            label.addClass('active highlight');
        }
    } else if (e.type === 'blur') {
        if( $this.val() === '' ) {
            label.removeClass('active highlight');
        } else {
            label.removeClass('highlight');
        }
    } else if (e.type === 'focus') {

        if( $this.val() === '' ) {
            label.removeClass('highlight');
        }
        else if( $this.val() !== '' ) {
            label.addClass('highlight');
        }
    }

});

$('.tab a').on('click', function (e) {

    e.preventDefault();

    $(this).parent().addClass('active');
    $(this).parent().siblings().removeClass('active');

    target = $(this).attr('href');

    $('.tab-content > div').not(target).hide();

    $(target).fadeIn(600);

});
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
            }
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

function validarLogin() {
    event.preventDefault()
    // Obter os valores dos campos de nome de usuário e senha
    var username = document.getElementById('login__username').value;
    var password = document.getElementById('login__password').value;

    console.log(username);
    console.log(password);

    // Validação simples (exemplo)
    if (username && password) {
        // Login válido, redirecionar para a página de destinofunction validarLogin() {
        //     // Obter os valores dos campos de nome de usuário e senha
        //     var username = document.getElementById('username').value;
        //     var password = document.getElementById('password').value;
        // 
        //     console.log(username);
        //     console.log(password);
        // 
        //     // Validação simples (exemplo)
        //     if (username && password) {
        //         // Login válido, redirecionar para a página de destino
        //         window.location.href = '../pages/app.html';
        //     } else {
        //         // Exibir mensagem de erro
        //         alert('Nome de usuário ou senha inválidos!');
        //     }
        // }
        fazerLogin(username, password);
        
    } else {
        // Exibir mensagem de erro
        alert('Nome de usuário ou senha não preenchidos!');
    }
}

function redirecionarPaginaLogin() {
    window.location.href = '../index.html';
}

