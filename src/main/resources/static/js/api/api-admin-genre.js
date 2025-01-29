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
                bodyHtml += `<button class="btn btn-secondary me-2">Edit</button>`;
                bodyHtml += `<button class="btn btn-danger">Delete</button>`;
                bodyHtml += `</div>`;
            }

            element.innerHTML = bodyHtml;

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
// USED TO SAVE NEW GENRES
//
async function saveGenre(genreData) {

    try {
        const response = await fetch('/api/genres/save', {
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