const postsUri = 'api/Post';

window.onload = initializePage();

function initializePage() {
    fetch('template/header.html')
        .then(response => response.text())
        .then(text => document.getElementById('navbarHeader').innerHTML = text);
    getPosts();
}

function getPosts() {
    fetch(postsUri)
        .then((response) => response.json())
        .then((posts) => displayPosts(posts))
        .catch((error) => console.error('Unable to get posts : ', error));
}

function displayPosts(posts) {
    const postsContainer = document.getElementById('posts-container');

    posts.forEach((post) => {
        const colDiv = document.createElement('div');
        postsContainer.appendChild(colDiv).classList.add('col');

        const cardDiv = document.createElement('div');
        colDiv.appendChild(cardDiv).classList.add('card', 'shadow-sm');

        const cardBodyDiv = document.createElement('div');
        cardDiv.appendChild(cardBodyDiv).classList.add('card-body');

        const pElement = document.createElement('p');
        cardBodyDiv.appendChild(pElement).classList.add('card-text');

        const title = document.createTextNode(post.title);
        pElement.appendChild(title);

        const contentDiv = document.createElement('div');
        cardBodyDiv.appendChild(contentDiv).classList.add('d-flex', 'justify-content-between', 'align-items-center');

        const btnDiv = document.createElement('div');
        contentDiv.appendChild(btnDiv).classList.add('btn-group');

        const btn = document.createElement('button');
        btn.addEventListener('click', (event) => {
            location.href = `/details.html?id=${post.id}`
        });
        const btnText = document.createTextNode('Check the question');
        btnDiv.appendChild(btn).classList.add('btn', 'btn-sm', 'btn-outline-secondary');
        btn.appendChild(btnText);

        const likesElement = document.createElement('small');
        const likesValue = document.createTextNode(post.likes.toString() + ' like(s)');
        contentDiv.appendChild(likesElement).classList.add('text-muted');
        likesElement.appendChild(likesValue);
    });
}

function goToCreatePost() {
    location.href = '/createPost.html';
}