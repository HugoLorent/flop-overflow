document.addEventListener('DOMContentLoaded', function () {
    setTimeout(function () {
        checkToken();
    }, 100);
}, false);

function checkToken() {
    var token = getToken();

    if (token != null && token != "") {
        var login = document.getElementById("login-btn");
        login.style.display = "none";
    } else {
        var logout = document.getElementById("logout-btn");
        logout.style.display = "none";
    }
}

function goOnLoginPage() {
    location.href = '/login.html';
}

function logout() {
    document.cookie = "token=";
    location.href = '/login.html';
}