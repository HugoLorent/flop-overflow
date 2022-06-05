const postUserUri = '/api/User';

function register() {

    let success = true;
    const login = {
        Login: document.getElementById('login').value.trim(),
        Pwd: document.getElementById('pwd').value.trim()
    };

    fetch(postUserUri, {
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
                window.location.href = "index.html";
            }
        })
        .catch(error => console.error('Unable to register.', error));
}