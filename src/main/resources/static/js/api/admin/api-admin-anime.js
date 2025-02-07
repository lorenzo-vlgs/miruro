async function getAllAnime() {
    try {
        const response = await fetch(
            '/api/animes/all',
            {
                method: 'GET',
                headers: { "Content-Type": "application/json" }
            }
        );

        const animeList = document.getElementById("anime-cards");

        if (response.ok) {
            const data = await response.json();
            let bodyHtml = '';

            for (let anime of data) {
                bodyHtml += `<div class="anime-card" onclick="redirectToAnimeForm(${anime.id})">`;
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

        } else {
            const errorText = await response.text();
            console.error('Failed to fetch anime data:', errorText); // Log the error response
        }
    } catch (error) {
        console.log('Error fetching animes: ' + error.message);
    }
}