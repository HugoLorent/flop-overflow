function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    console.log(jsonPayload);

    return JSON.parse(jsonPayload);
};

function getToken() {

    var token = check_cookie_name("token");
    //var claims = parseJwt(token);
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

