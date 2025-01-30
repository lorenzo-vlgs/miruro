//
// OTTENGO TUTTI I GENERI DAL DB
//
async function getAllStudios(url,tagId) {
    
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {'Content-type': 'application/json'}
        });

        const element = document.getElementById(tagId);

        if (response.ok){
            const data = await response.json();
            
            let bodyHtml = '';

            for (let studio of data) {
                bodyHtml += `<div>`;
                bodyHtml += `<img src="${studio.image}" alt="${studio.name}" style="width: 200px; height: auto; margin-top: 40px;">`
                bodyHtml += `<p class='fw-semibold fs-3' style='margin-top: 30px'>${studio.name}</p>`;
                bodyHtml += `<br>`;
                bodyHtml += `<button class="btn btn-secondary me-2 edit-button">Edit</button>`;
                bodyHtml += `<button class="btn btn-danger delete-button">Delete</button>`;
                bodyHtml += `</div>`;
            }

            element.innerHTML = bodyHtml;
        } else {
            const errorText = await response.text();
            console.error(`Failed to fetch data from ${url}: `, errorText)
        }


    } catch (error) {
        console.log(`Error found when fetch ${url}: ${error.message}`)
    }
}

// CHIAMA LA FUNZIONE
//
getAllStudios('/api/studios/all', 'studios-list');