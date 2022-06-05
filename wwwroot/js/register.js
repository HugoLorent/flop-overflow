const postUserUri = '/api/User';

function register() {

    const user = {
        Login: document.getElementById('login').value.trim(),
        Pwd: document.getElementById('pwd').value.trim()
    };

    fetch(postUserUri, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
        })
        .then(response => {
            return response.json();
        })
        .then(data => {
            document.cookie = "token=" + data;
            window.location.href = "index.html";
        })
        .catch(error => console.error('Unable to register.', error));
}