//
// OTTIENGO TUTTI I GENERI DAL DB
//
async function getAllGenres(url, tagId) {
 
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {"Content-type": "application/json"}
        });

        const element = document.getElementById(tagId);

        if (response.ok) {
            const data = await response.json();
            let bodyHtml = '';

            for (let genre of data) {
                bodyHtml += `<div>`;
                bodyHtml += `<p class='fw-semibold fs-3' style='margin-top: 30px'>${genre.genreName}</p>`;
                bodyHtml += `<br>`;
                bodyHtml += `<button class="btn btn-secondary me-2 edit-button" data-name="${genre.genreName}" data-id="${genre.id}" data-bs-toggle="modal" data-bs-target="#editGenre">Edit</button>`;
                bodyHtml += `<button class="btn btn-danger delete-button" data-name="${genre.genreName}" data-id="${genre.id}" data-bs-toggle="modal" data-bs-target="#deleteGenre">Delete</button>`;
                bodyHtml += `</div>`;
            }

            element.innerHTML = bodyHtml;

            // Add event listeners to the edit buttons
            // For each genre this dynamically give the id and name to the modal
            const editButtons = document.querySelectorAll('.edit-button');
            editButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const genreId = this.getAttribute('data-id');
                    const genreName = this.getAttribute('data-name');
                    document.getElementById('genreId').value = genreId;
                    document.getElementById('genre-name').innerHTML = genreName;
                });
            });

            const deleteButtons = document.querySelectorAll('.delete-button');
            deleteButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const genreId = this.getAttribute('data-id');
                    const genreName = this.getAttribute('data-name');
                    document.getElementById('genreIdDelete').value = genreId;
                    document.getElementById('genre-name-delete').innerHTML = genreName;
                });
            });
            
        } else {
            const errorText = await response.text();
            console.error(`Failed to fetch data from ${url}: `, errorText)
        }
    } catch (error) {
        console.log(`Error fetching data from ${url}: ${error.message}`)
    }
}

// CHIAMA LA FUNZIONE
// 
getAllGenres('/api/genres/all', 'genres-list');



//
// USED TO SAVE NEW GENRES AND EDIT EXISTING ONES
//
async function postGenre(url,genreData) {

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(genreData)
        });

        if (response.ok) {
            console.log('Genre saved successfully');
        } else {
            console.error('Failed to save genre:', await response.text());
        }
        
    } catch (error) {
        console.log(`Error sending data: ${error.message}`);
    }

}