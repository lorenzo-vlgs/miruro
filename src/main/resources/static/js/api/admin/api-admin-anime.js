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
                bodyHtml += `<div class="anime-card">`;
                bodyHtml += `<div class="anime-image">
                                <img src="${anime.image}" alt="${anime.name}" onclick="redirectToAnimeForm(${anime.id})">
                                <button class="btn btn-sm btn-secondary position-absolute top-0 end-0 m-2 anime-button" style="display: none;" onclick="delAnime(${anime.id})"><i class="bi bi-trash"></i></button>
                            </div>`;
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

            // Add hover events to show/hide the button
            const characterContainers = document.querySelectorAll('.anime-card');
            characterContainers.forEach(container => {
                container.addEventListener('mouseenter', () => {
                    container.querySelector('.anime-button').style.display = 'block';
                });
                container.addEventListener('mouseleave', () => {
                    container.querySelector('.anime-button').style.display = 'none';
                });
            });

        } else {
            const errorText = await response.text();
            console.error('Failed to fetch anime data:', errorText); // Log the error response
        }
    } catch (error) {
        console.log('Error fetching animes: ' + error.message);
    }
}

async function delAnime(id) {
    
    if (confirm(`Are you sure you want to delete this anime?`)) {
        
        deleteAnime(`/api/animes/delete`,id);
        location.reload();

    }

}