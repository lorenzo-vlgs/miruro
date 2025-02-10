// Get anime id
let idUrl = null;

document.addEventListener('DOMContentLoaded', () => {
    // Get the 'id' parameter from the URL
    const urlParams = new URLSearchParams(window.location.search);
    idUrl = urlParams.get('id');

});

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


