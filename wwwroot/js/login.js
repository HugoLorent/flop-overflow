const uri = 'https://flop-overflow.azurewebsites.net/api/Login'
//const uri = 'https://localhost:44348/api/Login'

window.onload = checkToken;

function checkToken() {
    if (check_cookie_name("token") != null) {
        window.location.href = "index.html";
    }
}

function check_cookie_name(name) {
    var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) {
        return(match[2]);
    }
    else {
        return null;
    }
}

function signin() {

    var success = true;
    const login = {
        Login: document.getElementById('login').value.trim(),
        Pwd: document.getElementById('pwd').value.trim()
    };

    fetch(uri, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(login)
    })
        .then(response => {
            if (response.status === 404) {
                alert("Try again...");
                success = false;
            }
            return response.json();
        })
        .then(data => {
            if (success) {
                document.cookie = "token=" + data;
                window.location.href = "index.html";
            }
        })
        .catch(error => console.error('Unable to login.', error));
}