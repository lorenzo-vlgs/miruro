// Get anime id
let id = null;

document.addEventListener('DOMContentLoaded', () => {
    // Get the 'id' parameter from the URL
    const urlParams = new URLSearchParams(window.location.search);
    id = urlParams.get('id');

    // Use the 'id' variable to fetch and display anime details
    if (id > 0) {
        getAnime(id);
    } else {
        console.error('Anime ID not found in the URL');
    }


    console.log();
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

        // Fetch all genres
        const genres = await getGenres('/api/genres/all');

        // Populate existing genres
        const genreContainer = document.getElementById('genre-container');
        genreContainer.innerHTML = ""; // Clear previous genres (if any)

        anime.genres.forEach((animeGenre, index) => {
            genreCount++;
            const genreDiv = document.createElement('div');
            genreDiv.classList.add('d-flex', 'align-items-center', 'mt-2');
            genreDiv.innerHTML = `
                <span class="me-2">${genreCount}.</span>
                <select class="form-select">
                </select>
            `;

            const selectElement = genreDiv.querySelector('select');

            // Populate dropdown with all available genres
            genres.forEach(genre => {
                const option = document.createElement('option');
                option.value = genre.id;
                option.textContent = genre.genreName;
                if (genre.id === animeGenre.id) {
                    option.selected = true; // Preselect the current anime genre
                }
                selectElement.appendChild(option);
            });

            genreContainer.appendChild(genreDiv);
        });

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


