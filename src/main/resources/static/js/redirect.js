// Redirect function when an anime card is clicked
function redirectToAnime(id) {
    window.location.href = `/anime?id=${id}`; // Redirect to the anime page with the selected anime id
}

function redirectToForm(){
    window.location.href = `/admin/studios/form`;
}