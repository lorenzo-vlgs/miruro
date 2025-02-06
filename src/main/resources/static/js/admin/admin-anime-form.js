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


// const selectedGenres = [];
// document.querySelectorAll('#genre-container select').forEach(select => {
//     selectedGenres.push(select.value);
// });
