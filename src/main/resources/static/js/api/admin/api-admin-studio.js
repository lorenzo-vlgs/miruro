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
                bodyHtml += `<div class="d-flex flex-column align-items-center">`;
                bodyHtml += `<img src="${studio.image}" alt="${studio.name}" class="img-fluid" style="width: 200px; height: auto; margin-top: 40px;">`;
                bodyHtml += `<p class='fw-semibold fs-3 studio-title text-center'>${studio.name}</p>`;
                bodyHtml += `<br>`;
                bodyHtml += `<div class="d-flex">`;
                bodyHtml += `<button class="btn btn-secondary me-2" onClick="redirectToForm(${studio.id})">Edit</button>`;
                bodyHtml += `<button class="btn btn-danger delete-button" data-id="${studio.id}" data-name="${studio.name}" data-bs-toggle="modal" data-bs-target="#studioDelete">Delete</button>`;
                bodyHtml += `</div>`;
                bodyHtml += `</div>`;

            }

            element.innerHTML = bodyHtml;

            // Add event listeners to the delete buttons
            // For each genre this dynamically give the id and name to the modal    
            const editButtons = document.querySelectorAll('.delete-button');
            editButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const studioId = this.getAttribute('data-id');
                    const studioName = this.getAttribute('data-name');
                    document.getElementById('studioId').value = studioId;
                    document.getElementById('studio-name').innerHTML = studioName;
                });
            });
        } else {
            const errorText = await response.text();
            console.error(`Failed to fetch data from ${url}: `, errorText)
        }


    } catch (error) {
        console.log(`Error found when fetch ${url}: ${error.message}`)
    }
}


//
// CANCELLO UNO STUDIO DAL DB
//
async function deleteStudio(url, studioData) {

    try {
        
        const response = await fetch(url, {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(studioData)
        });

        if (response.ok) {
            console.log('Genre saved successfully');
        } else {
            console.error('Failed to save genre:', await response.text());
        }

    } catch (error) {
        console.log(`Error found when fetching ${url}: ${error.message}`)
    }
}