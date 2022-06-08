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

    if (loginContent === "" || pwdContent === "")
    {
        $('#myModalContent').text("Please fill in the login and password");
        $("#myModal").modal('show');
        return
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
            if (success) {
                document.cookie = "token=" + data;
                window.location.href = "index.html";
            } else {
                $('#myModalContent').text(data);
                $("#myModal").modal('show');
            }
        })
        .catch(error => {
            $('#myModalContent').text("An error has occurred");
            $("#myModal").modal('show');
        });
}