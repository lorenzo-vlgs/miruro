async function getAnimeNames(url) {
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {'Content-type': 'application/json'}
        });

        if (!response.ok) {
            console.error(`Something didn't go well when fetching ${url}: ${await response.text()}`);
            return;
        }

        const data = await response.json();
        const container = document.getElementById('anime-container');
        
        if (!container) {
            console.error("Element with ID 'anime-container' not found in the DOM.");
            return;
        }

        container.innerHTML = "";

        for (const anime of data) {
            const animeBlock = document.createElement('div');
            animeBlock.innerHTML = `
                <div class="fs-1 fw-semibold mb-3">${anime.name}</div>
                <button class="btn btn-secondary" onclick="redirectToCharacterForm(${anime.id})">+ Add character</button>
                <hr>
                <div class="container text-center">
                    <div class="row justify-content-center" id="${anime.id}" style="margin-bottom:100px;"></div>
                </div>

            `;

            container.appendChild(animeBlock);

            // Fetch characters for this anime
            await getCharactersById(`/api/characters/byAnime?idAnime=${anime.id}`, anime.id);

        }
    } catch (error) {
        console.error(`Error when fetching ${url}: ${error.message}`);
    }
}

async function getCharactersById(url, id) {
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {'Content-type': 'application/json'}
        });

        if (!response.ok) {
            console.error(`Error when getting response from ${url}: ${await response.text()}`);
            return;
        }

        const characters = await response.json();
        const container = document.getElementById(id.toString());

        if (!container) {
            console.error(`Container with ID '${id}' not found.`);
            return;
        }

        let bodyHtml = `<div class="row">`;

        characters.forEach((character, index) => {
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

        container.innerHTML = bodyHtml;

    } catch (error) {
        console.error(`Error when fetching ${url}: ${error.message}`);
    }
}
