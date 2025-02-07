// Get anime id
let id = null;

document.addEventListener('DOMContentLoaded', () => {
    // Get the 'id' parameter from the URL
    const urlParams = new URLSearchParams(window.location.search);
    id = urlParams.get('id');

    // Use the 'id' variable to fetch and display anime details
    if (id > 0) {
        getAnime(id);
    }

});

async function getAnime() {
    try {
        const response = await fetch(`/api/animes/${id}`, {
            method: 'GET',
            headers: { "Content-Type": "application/json" }
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Failed to fetch anime data:', errorText);
            return;
        }

        const anime = await response.json();

        // Populate fields
        document.getElementById('animeTitle').value = anime.name;
        document.getElementById('animeImage').value = anime.image;
        document.getElementById('description').value = anime.description;
        document.getElementById('episodes').value = anime.episodes;
        document.getElementById('dob').value = anime.rilascio;
        document.getElementById('imageDisplay').src = anime.image;

        // Fetch all genres and studios
        const genres = await getGenres('/api/genres/all');
        const studios = await getStudios('/api/studios/all');

        // Populate existing genres
        const genreContainer = document.getElementById('genre-container');
        genreContainer.innerHTML = "";
        anime.genres.forEach((animeGenre, index) => {
            genreCount++;
            const genreDiv = document.createElement('div');
            genreDiv.classList.add('d-flex', 'align-items-center', 'mt-2');
            genreDiv.innerHTML = `
                <span class="me-2 genre-number">${genreCount}.</span>
                <select class="form-select">
                </select>
                <button type="button" class="btn-close ms-2" aria-label="Close"></button>
            `;

            const selectElement = genreDiv.querySelector('select');
            const closeButton = genreDiv.querySelector('.btn-close');

            genres.forEach(genre => {
                const option = document.createElement('option');
                option.value = genre.id;
                option.textContent = genre.genreName;
                if (genre.id === animeGenre.id) {
                    option.selected = true;
                }
                selectElement.appendChild(option);
            });

            closeButton.addEventListener('click', () => {
                genreDiv.remove();
                updateGenreNumbers();
            });

            genreContainer.appendChild(genreDiv);
        });

        // Populate existing studios
        const studioContainer = document.getElementById('studio-container');
        studioContainer.innerHTML = "";
        anime.studios.forEach((animeStudio, index) => {
            studioCount++;
            const studioDiv = document.createElement('div');
            studioDiv.classList.add('d-flex', 'align-items-center', 'mt-2');
            studioDiv.innerHTML = `
                <span class="me-2 studio-number">${studioCount}.</span>
                <select class="form-select">
                </select>
                <button type="button" class="btn-close ms-2" aria-label="Close"></button>
            `;

            const selectElement = studioDiv.querySelector('select');
            const closeButton = studioDiv.querySelector('.btn-close');

            studios.forEach(studio => {
                const option = document.createElement('option');
                option.value = studio.id;
                option.textContent = studio.name;
                if (studio.id === animeStudio.id) {
                    option.selected = true;
                }
                selectElement.appendChild(option);
            });

            closeButton.addEventListener('click', () => {
                studioDiv.remove();
                updateStudioNumbers();
            });

            studioContainer.appendChild(studioDiv);
        });


        //Populate with the existing characters
        const charactersContainer = document.getElementById('character-container');
        let bodyHtml = '';

        bodyHtml += `<div class="row">`;
        anime.characters.forEach((character, index) => {
            // Open a new row every 2 characters
            if (index % 2 === 0 && index !== 0) {
                bodyHtml += `<hr><hr>`;
                bodyHtml += `</div><div class="row">`;
            }
            
            bodyHtml += `
                <div class="col-md-6">
                    <div class="character text-center">
                        <img src="${character.image}" alt="${character.name}" class="img-fluid">
                        <div class="fw-semibold fs-5"> ${character.name}</div>
                        <div> ${character.role}</div>
                    </div>
                </div>
            `;
        });
        bodyHtml += `</div>`; // Close last row

charactersContainer.innerHTML = bodyHtml;


        charactersContainer.innerHTML = bodyHtml;

    } catch (error) {
        console.log('Error fetching anime:', error.message);
    }
}

async function getGenres(url) {
    
    let data = {"test": "testino"};

    try {
        
        const response = await fetch(url, {
            method: 'GET',
            headers: {'Content-type': 'application/json'}
        });


        if (response.ok) {

            data = await response.json();

        } else {
            
            console.error(`Error when fetching ${url}: ${await response.text()}`)

        }

    } catch (error) {
        console.error(`Error fetching animes on ${url}: ${error.message}`)    
    }

    return data;
}

async function getStudios(url) {
    
    let studioData = {"test": "testino"};

    try {
        
        const response = await fetch(url, {
            method: 'GET',
            headers: {'Content-type': 'application/json'}
        });


        if (response.ok) {

            studioData = await response.json();

        } else {
            
            console.error(`Error when fetching ${url}: ${await response.text()}`)

        }

    } catch (error) {
        console.error(`Error fetching animes on ${url}: ${error.message}`)    
    }

    return studioData;
}

async function postAnime(url,animeData) {
    
    try {
        
        const response = await fetch(url, {
            method:'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(animeData)
        });
        
        if (response.ok) {
            console.log('Anime saved');
        } else {
            console.error(`Error during fetch: `, await response.text());
        }

    } catch (error) {
        console.error(`Error found when fetching: ${error.message}`)
    }
}

