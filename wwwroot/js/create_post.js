const uri = 'api/Post';
window.onload = checkToken;
document.getElementById("cancel").onclick = function () { window.location.href = "index.html" }


function checkToken() {
    // add header
    fetch('template/header.html')
        .then(response => response.text())
        .then(text => document.getElementById('navbarHeader').innerHTML = text);

    if (check_cookie_name("token") === null) {
        window.location.href = "login.html";
        console.log("passe")
    }
}
    
function createPost() {
    var currentdate = new Date();
    var datetime = currentdate.getFullYear() + "-"
        + ("0" + (currentdate.getMonth() + 1)).slice(-2) + "-"
        + ("0" + (currentdate.getDay() + 1)).slice(-2) + "T"
        + currentdate.getHours() + ":"
        + currentdate.getMinutes() + ":"
        + currentdate.getSeconds();
    
    const post = {
        Title: document.getElementById('title').value.trim(),
        Content: document.getElementById('content').value.trim(),
        Likes: 0,
        Date: datetime,
        Resolved: false
    };
    console.log(post)

    fetch(uri, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getToken()
        },
        body: JSON.stringify(post)
    })
        .then(response => response.json())
        .catch(error => console.error('Unable to add item.', error))
        .then(window.location.href = "index.html")

    
}
