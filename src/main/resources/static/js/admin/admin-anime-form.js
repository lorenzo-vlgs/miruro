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
        <span class="me-2">${genreCount}.</span>
        <select class="form-select">
        </select>
    `;

    const selectElement = genreDiv.querySelector('select');

    //
    // Adds as many options to the select as there are genres
    //
    genres.forEach(genre => {
        const option = document.createElement('option');
        option.value = genre.id;  // Assuming genres have an 'id' property
        option.textContent = genre.genreName; // Assuming genres have a 'name' property
        selectElement.appendChild(option);
    });

    // Inserts the select into the container
    //
    genreContainer.appendChild(genreDiv);
});

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
        "dob": dob
    };

    const url = idUrl === "0" ? '/api/animes/save' : '/api/animes/update';
    // console.log(url);
    postAnime(url,animeData);
});



