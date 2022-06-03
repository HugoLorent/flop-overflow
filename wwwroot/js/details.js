const uri = 'https://localhost:44348/api/Post';


function checkParam() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id');

    fetch(uri + "/" + id)
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Unable to get items.', error));

}