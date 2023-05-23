dataTest = {};

async function fazerLogin() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

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
        ).then(function(data) {
            return data.json();
        }).then(function (data) {
            console.log(data);
            dataTest = data;
            localStorage.setItem('userjwt', data["JWT"])
            localStorage.setItem('ClienteId', data["ClienteId"])
        })
    }
}
