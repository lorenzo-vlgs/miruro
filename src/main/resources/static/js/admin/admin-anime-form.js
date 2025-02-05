let genreCount = 0;
    document.getElementById('addGenre').addEventListener('click', function () {
        genreCount++;
        const genreContainer = document.getElementById('genre-container');
        const genreDiv = document.createElement('div');
        genreDiv.classList.add('d-flex', 'align-items-center', 'mt-2');
        genreDiv.innerHTML = `
            <span class="me-2">${genreCount}.</span>
            <select class="form-select">
                <option value="action">Action</option>
                <option value="adventure">Adventure</option>
                <option value="comedy">Comedy</option>
                <option value="drama">Drama</option>
                <option value="fantasy">Fantasy</option>
                <option value="horror">Horror</option>
                <option value="mystery">Mystery</option>
                <option value="romance">Romance</option>
                <option value="sci-fi">Sci-Fi</option>
                <option value="slice-of-life">Slice of Life</option>
            </select>
        `;
        genreContainer.appendChild(genreDiv);
});

document.getElementById('animeImage').addEventListener('input', function() {

    // Serve a mostrare l'immagine dopo aver inserito l'url nell'input
    const url = this.value;
    document.getElementById('imageDisplay').src = url;
});
