const uri = 'api/Post'

window.onload = initializePage;

function initializePage() {

    // add header
    fetch('template/header.html')
        .then(response => response.text())
        .then(text => document.getElementById('navbarHeader').innerHTML = text);

    // get post
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id');

    let success = true;
    fetch(uri + "/" + id)
        .then(response => {
            if (response.status === 404) {
                success = false;
            }
            return response.json();
        })
        .then(data => {
            if (success) {
                displayPost(data)
            } else {
                $('#modal-content').text(data);
                $("#modal").modal('show');
            }
        })
        .catch(error => {
            $('#modal-content').text("An error has occurred");
            $("#modal").modal('show');
        });
}

function displayPost(post) {
    const postTitle = document.getElementById('post-title');
    postTitle.textContent = post.title;

    const postContent = document.getElementById('post-content');
    postContent.textContent = post.content;

    const postLikes = document.getElementById('post-likes');
    postLikes.textContent = post.likes + " likes";

    const postDate = document.getElementById('post-date');
    postDate.textContent = post.date;

    const postUser = document.getElementById('post-user');
    postUser.textContent = post.user.login;

    const commentsContainer = document.getElementById('comments-container');
    commentsContainer.innerHTML = "";
    post.comments.forEach((com) => {
        var colDiv = document.createElement('div');
        commentsContainer.appendChild(colDiv).classList.add('card-body');

        var pElement = document.createElement('p');
        colDiv.appendChild(pElement).classList.add('card-text');

        var content = document.createTextNode(com.content);
        pElement.appendChild(content);

        var contentDiv = document.createElement('div');
        colDiv.appendChild(contentDiv).classList.add('d-flex', 'justify-content-between', 'align-items-center');

        var btnDiv = document.createElement('div');
        contentDiv.appendChild(btnDiv);

        var infoDiv = document.createElement('div');
        contentDiv.appendChild(infoDiv);

        const dateElement = document.createElement('small');
        const dateValue = document.createTextNode(com.user.login + " le " + new Date(com.date).toLocaleDateString("fr"));
        infoDiv.appendChild(dateElement).classList.add('text-muted');
        dateElement.appendChild(dateValue);
    })
}

function addComment() {
    var tbComment = document.getElementById("comment");

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id');

    const url = uri + "/" + id + "/Comment";
    const comment = {
        Content: tbComment.value,
    };

    fetch(url, {
        method: 'POST',
        credentials: "include",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getToken()
        },
        body: JSON.stringify(comment)
    })
        .then(response => {
            return response.json();
        })
        .then(data => {
            tbComment.value = "";
            displayPost(data);
        })
        .catch(error => {
            $('#modal-content').text("An error has occurred");
            $("#modal").modal('show');
        });
}

function likePost() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id');

    const url = uri + "/" + id + "/Like";

    let success = true;
    fetch(url, {
        method: 'PATCH',
        credentials: "include",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getToken()
        }
    })
        .then(response => {
            if (response.status == 401) { success = false }
            return response.json();
        })
        .then(data => {
            if (success) {
                displayPost(data);
            } else {
                $('#modal-content').text(data);
                $("#modal").modal('show');
            }
        })
        .catch(error => {
            $('#modal-content').text("An error has occurred");
            $("#modal").modal('show');
        })
}