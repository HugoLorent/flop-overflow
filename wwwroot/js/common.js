function getToken() {
    var token = check_cookie_name("token");
    return token;
}

function check_cookie_name(name) {
    var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) {
        return (match[2]);
    }
    else {
        return null;
    }
}

