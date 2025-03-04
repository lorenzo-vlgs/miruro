// Load genres and ratings on page load
var page = 0;
var size = 10;

// numero della pagina
document.getElementById('page-number').innerText = page + 1;

document.addEventListener('DOMContentLoaded', () => {
    loadAnimePage(page);
});

function prevPage() {
    if (page > 0) {
        page--;
        document.getElementById('page-number').innerText = page + 1;
        loadAnimePage(page);
    } else {
        page = 0;
    }
}

async function nextPage() {
    const data = await getAllAnime(`/api/animes/paged?page=${page + 1}&size=${size}&sort=name,asc`);
    if (data && data.length > 0) {
        page++;
        document.getElementById('page-number').innerText = page + 1;
        updateAnimeList(data);
    } else {
        // Gestisci il caso in cui non ci sono più pagine
        console.log('No more pages available');
    }
}

async function loadAnimePage(page) {
    const data = await getAllAnime(`/api/animes/paged?page=${page}&size=${size}&sort=name,asc`);
    if (data) {
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