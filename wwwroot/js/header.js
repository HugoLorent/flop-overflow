function goOnLoginPage() {
    location.href = '/login.html';
}

function logout() {
    document.cookie = '';
    location.href = '/login.html';
}