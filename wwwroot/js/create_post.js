﻿const uri = 'api/Post';

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
        Resolved: false,
        User_id: 1
    };
    console.log(post)

    fetch(uri, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
    })
        .then(response => response.json())
        .catch(error => console.error('Unable to add item.', error))
}
