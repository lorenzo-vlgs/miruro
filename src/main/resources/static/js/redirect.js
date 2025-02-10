// Redirect function when an anime card is clicked
function redirectToAnime(id) {
    window.location.href = `/anime?id=${id}`; // Redirect to the anime page with the selected anime id
}

function redirectToForm(id){
    window.location.href = `/admin/studios/form?id=${id}`;
}

function redirectToAnimeForm(id) {
    window.location.href= `/admin/anime?id=${id}`;
}

function redirectToCharacterForm(id) {
    window.location.href= `/admin/characters/form?id=${id}`;
}