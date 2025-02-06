
let genreCount = 0;

document.getElementById('addGenre').addEventListener('click', async function () {
    genreCount++;

    const genres = await getGenres('/api/genres/all');
    console.log(genres);

    const genreContainer = document.getElementById('genre-container');
    const genreDiv = document.createElement('div');

    genreDiv.classList.add('d-flex', 'align-items-center', 'mt-2');
    genreDiv.innerHTML += `
        <span class="me-2">${genreCount}.</span>
        <select class="form-select">
        </select>
    `;

    const selectElement = genreDiv.querySelector('select');

    genres.forEach(genre => {
        const option = document.createElement('option');
        option.value = genre.id;  // Assuming genres have an 'id' property
        option.textContent = genre.genreName; // Assuming genres have a 'name' property
        selectElement.appendChild(option);
    });

    genreContainer.appendChild(genreDiv);
});


document.getElementById('animeImage').addEventListener('input', function() {

    // Serve a mostrare l'immagine dopo aver inserito l'url nell'input
    const url = this.value;
    document.getElementById('imageDisplay').src = url;
});



