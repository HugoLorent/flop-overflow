const uri = 'api/Login'

window.onload = checkToken;

function goToRegisterPage() {
    location.href = '/register.html'
}

function checkToken() {
    var token = getToken();
    if (token != null && token != "") {
        window.location.href = "index.html";
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