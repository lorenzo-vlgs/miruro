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

async function redirectToRndAnime(){

    const response = await fetch(
        '/api/animes/all',
        {
            method: 'GET',
            headers: { "Content-Type": "application/json" }
        }
    );

    const data = await response.json();
    let idList = [];

    for (const anime of data) {
        idList.push(anime.id);
    }

    const randomId = idList[Math.floor(Math.random() * idList.length)];
    redirectToAnime(randomId);
}