document.addEventListener('DOMContentLoaded', async () => {
    // Get the 'id' parameter from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    // Use the 'id' variable to fetch and display anime details
    if (id) {
        const anime = await httpService.invoke(`api/animes/${id}`,'GET');
        if (anime) {
            updateAnimeDetails(anime);
        }
    } else {
        console.error('Anime ID not found in the URL');
    }
});

function updateAnimeDetails(anime) {
    const animeList = document.getElementById("anime-card");
    let bodyHtml = '';

    // Content
    bodyHtml += `<div class="row">`;
    bodyHtml += `<div class="col-9 fs-2 fw-bold">${anime.name}</div>`; 
    bodyHtml += `<div class="col-4"><div class="anime-image"><br><img src="${anime.image}" alt="${anime.name}"></div></div>`;
    bodyHtml += `<div class="col-6"><div class="bottom-outline fs-4 fw-semibold">Synopsis</div><br>${anime.description}`;
    bodyHtml += `<br><br><p class="fs-4 fw-semibold bottom-outline">Information</p>`
    bodyHtml += `<span>Genres:</span>`

    for (let genre of anime.genres) {
        bodyHtml += `<span class="genre"> ${genre.genreName}</span>`
    }

    bodyHtml += `<p style="margin-right:20px">Episodes: ${anime.episodes}</p>`
    bodyHtml += `<p>Release date: ${anime.rilascio}</p>`;
    bodyHtml += `<span>Studios: </span>`;

    for (let studio of anime.studios) {
        bodyHtml += `<span>${studio.name}</span>`
    }

    bodyHtml += `</div>`; // Closing col-4 div

    bodyHtml += `<div class="col-7"><br><br><div class="bottom-outline fs-4 fw-semibold">Characters</div><br>`;
    bodyHtml += `<div class="row justify-content-center" style="margin-bottom:100px;">`

    bodyHtml += `<div class="row">`;
    anime.characters.forEach((character, index) => {
        // Start a new row after every 6 characters
        if (index % 6 === 0 && index !== 0) {
            bodyHtml += `</div><div class="row">`;
        }

        bodyHtml += `
            <div class="col-2 d-flex flex-column align-items-center">
                <img src="${character.image}" alt="${character.name}" class="img-fluid rounded"
                    style="width: 120px; height: 160px; object-fit: cover;">
                <div class="fw-semibold fs-5 text-center mt-2">${character.name}</div>
                <div class="text-muted text-center">${character.role}</div>
            </div>
        `;
    });

    bodyHtml += `</div>`;
    bodyHtml += `</div>`;

    animeList.innerHTML = bodyHtml;
}