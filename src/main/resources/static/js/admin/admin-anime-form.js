// Get anime id
let id = null;

document.addEventListener('DOMContentLoaded', async () => {
    // Get the 'id' parameter from the URL
    const urlParams = new URLSearchParams(window.location.search);
    id = urlParams.get('id');

    // Use the 'id' variable to fetch and display anime details
    if (id) {
        const anime = await getAnime(id);
        if (anime) {
            updateAnime(anime);
        }
    } else {
        console.error('Anime ID not found in the URL');
    }
});


//
// POPOLA I CAMPI CON I DATI DELL'ANIME
//
async function updateAnime(anime) {
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
    bodyHtml += `</div>`; // Close last row

    charactersContainer.innerHTML = bodyHtml;
}

//
// Adds a new select dropdown when the button is clicked
//
let genreCount = 0;

document.getElementById('addGenre').addEventListener('click', async function () {
    genreCount++;

    // Fetches and stores all genres from the database
    //
    const genres = await getGenres('/api/genres/all');

    const genreContainer = document.getElementById('genre-container');
    const genreDiv = document.createElement('div');

    // Creates a select dropdown
    //
    genreDiv.classList.add('d-flex', 'align-items-center', 'mt-2');
    genreDiv.innerHTML += `
        <span class="me-2 genre-number">${genreCount}.</span>
        <select class="form-select">
        </select>
        <button type="button" class="btn-close ms-2" aria-label="Close"></button>
    `;

    const selectElement = genreDiv.querySelector('select');
    const closeButton = genreDiv.querySelector('.btn-close');

    //
    // Adds as many options to the select as there are genres
    //
    genres.forEach(genre => {
        const option = document.createElement('option');
        option.value = genre.id;  // Assuming genres have an 'id' property
        option.textContent = genre.genreName; // Assuming genres have a 'name' property
        selectElement.appendChild(option);
    });

    // Event for the specific delete 
    //
    closeButton.addEventListener('click', () => {
        genreDiv.remove();
        updateGenreNumbers();
    });

    // Inserts the select into the container
    //
    genreContainer.appendChild(genreDiv);
});

// Adds a new select dropdown when the button is clicked for Studios
let studioCount = 0;

document.getElementById('addStudio').addEventListener('click', async function () {
    studioCount++;

    // Fetches and stores all studios from the database
    const studios = await getStudios('/api/studios/all');

    const studioContainer = document.getElementById('studio-container');
    const studioDiv = document.createElement('div');
    studioDiv.classList.add('d-flex', 'align-items-center', 'mt-2');

    // Creates a select dropdown with a close button
    studioDiv.innerHTML = `
        <span class="me-2 studio-number">${studioCount}.</span>
        <select class="form-select">
        </select>
        <button type="button" class="btn-close ms-2" aria-label="Close"></button>
    `;

    const selectElement = studioDiv.querySelector('select');
    const closeButton = studioDiv.querySelector('.btn-close');

    // Adds studio options to the select
    studios.forEach(studio => {
        const option = document.createElement('option');
        option.value = studio.id;  
        option.textContent = studio.name;
        selectElement.appendChild(option);
    });

    // Close button functionality
    closeButton.addEventListener('click', () => {
        studioDiv.remove();
        updateStudioNumbers();
    });

    // Inserts the select into the container
    studioContainer.appendChild(studioDiv);
});

// Function to update studio numbers after deletion
function updateStudioNumbers() {
    studioCount = 0;
    document.querySelectorAll('#studio-container .studio-number').forEach((element) => {
        studioCount++;
        element.textContent = `${studioCount}.`;
    });
}

// Function to update studio numbers after deletion
function updateGenreNumbers() {
    genreCount = 0;
    document.querySelectorAll('#genre-container .genre-number').forEach((element) => {
        genreCount++;
        element.textContent = `${genreCount}.`;
    });
}

//
// Updates the image as soon as a URL is entered in the input field
//
document.getElementById('animeImage').addEventListener('input', function() {

    // Displays the image after entering the URL in the input field
    const url = this.value;
    document.getElementById('imageDisplay').src = url;
});

//
// Saves the anime
//
document.getElementById('anime-form').addEventListener('submit', function(event) {
    event.preventDefault();


    // Saves all the genres in a list
    const selectedGenres = [];
    document.querySelectorAll('#genre-container select').forEach(select => {
        selectedGenres.push(select.value);
    });

    const selectedStudios = [];
    document.querySelectorAll('#studio-container select').forEach(select => {
        selectedStudios.push(select.value);
    });

    //Assigns all the values
    const name = document.getElementById('animeTitle').value;
    const image = document.getElementById('animeImage').value;
    const description = document.getElementById('description').value;
    const episodes = document.getElementById('episodes').value;
    const dob = document.getElementById('dob').value;    

    const animeData = {
        "id": idUrl,
        "name": name,
        "image": image,
        "description": description,
        "genres": selectedGenres,
        "episodes": episodes,
        "dob": dob,
        "studios": selectedStudios
    };

    const url = idUrl === "0" ? '/api/animes/save' : '/api/animes/update';
    // console.log(url);
    postAnime(url,animeData);

    window.location.href = '/admin/animes';
});


// GESTIRE IL REDIRECT
function redToForm() {
    
    console.log('SONO DENTRO')

    if(idUrl != '0'){
        redirectToCharacterForm(idUrl);
    } else {
        alert(`E' necessario salvare l'anime prima di poter aggiungere i personaggi`);
    }
    
}

