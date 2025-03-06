let genres = []; // Array to store genres
let currentStartIndex = 0;
const maxVisibleGenres = 14;

document.addEventListener('DOMContentLoaded', async () => {
    // Fetch genres from the server
    genres = await httpService.invoke('/api/genres/all', 'GET');
    displayGenres();

    // Add event listeners for navigation buttons
    document.getElementById('prev-genres').addEventListener('click', showPreviousGenres);
    document.getElementById('next-genres').addEventListener('click', showNextGenres);

    //iniziale
    searchByGenre(0);
});

function displayGenres() {
    const genresContainer = document.getElementById('genres-container');
    genresContainer.innerHTML = '';

    const endIndex = Math.min(currentStartIndex + maxVisibleGenres, genres.length);
    for (let i = currentStartIndex; i < endIndex; i++) {
        const genre = genres[i];
        const genreElement = document.createElement('span');
        genreElement.classList.add('badge', 'm-1', 'badge-color');
        genreElement.textContent = genre.genreName;
        genreElement.style.cursor = 'pointer';
        genreElement.addEventListener('click', () => {
            // Handle genre click
            searchByGenre(genre.id);
        });
        genresContainer.appendChild(genreElement);
    }
}

function showPreviousGenres() {
    if (currentStartIndex > 0) {
        currentStartIndex -= maxVisibleGenres;
        displayGenres();
    }
}

function showNextGenres() {
    if (currentStartIndex + maxVisibleGenres < genres.length) {
        currentStartIndex += maxVisibleGenres;
        displayGenres();
    }
}

async function searchByGenre(genreId) {

    let data;
    if (genreId === 0) {
        data = await httpService.invoke(`/api/animes/all`, 'GET');
    } else {
        data = await httpService.invoke(`/api/animes/all`, 'GET');

    }
    
    if(data){
        updateAnimeList(data);
    }
}

function updateAnimeList(data) {
    const animeList = document.getElementById("anime-cards");
    let bodyHtml = '';

    for (let anime of data) {
        bodyHtml += `<div class="anime-card" onclick="redirectToAnime(${anime.id})">`;
        bodyHtml += `<div class="anime-image"><img src="${anime.image}" alt="${anime.name}"></div>`;
        bodyHtml += `<div class="anime-details">`;
        bodyHtml += `<h2 class="anime-title">${anime.name}</h2>`;
        bodyHtml += `<div class="anime-categories">`;
        
        for (let category of anime.genres) {
            bodyHtml += `<span class="category">${category.genreName}</span>`;
        }
        
        bodyHtml += `</div>`;
        bodyHtml += `</div>`;
        bodyHtml += `</div>`;
    }

    animeList.innerHTML = bodyHtml;
}