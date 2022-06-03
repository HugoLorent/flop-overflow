function goOnLoginPage() {
    location.href = '/login.html';
}

function logout() {
    document.cookie = "token=";
    location.href = '/login.html';
}