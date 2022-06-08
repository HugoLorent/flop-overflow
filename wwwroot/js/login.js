const uri = 'api/Login'

window.onload = checkToken;

function goToRegisterPage() {
    location.href = 'register.html'
}

function checkToken() {
    var token = getToken();
    if (token != null && token != "") {
        window.location.href = "index.html";
    }
}

function signin() {

    var success = true;
    var loginContent = document.getElementById('login').value.trim();
    var pwdContent = document.getElementById('pwd').value.trim();

    if (loginContent === "" || pwdContent === "") {
        $('#modal-content').text("Please fill in the login and password");
        $("#modal").modal('show');
        return
    } else {
        $("#signin-spinner").show();
    }

    const login = {
        Login: loginContent,
        Pwd: pwdContent
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
                success = false;
            }
            return response.json();
        })
        .then(data => {
            $("#signin-spinner").hide();
            if (success) {
                document.cookie = "token=" + data;
                window.location.href = "index.html";
            } else {
                $('#modal-content').text(data);
                $("#modal").modal('show');
            }
        })
        .catch(error => {
            $("#signin-spinner").hide();
            $('#modal-content').text("An error has occurred");
            $("#modal").modal('show');
        });
}