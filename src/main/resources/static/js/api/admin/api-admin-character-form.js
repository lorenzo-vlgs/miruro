const chaName = document.getElementById('chaName');
const chaImage = document.getElementById('chaImage');
const description = document.getElementById('description');
const role = document.getElementById('role');


async function postCharacter(url, animeData) {

    try {
        
        const response = await fetch(url,{
            method:'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(animeData)
        });

        if (!response.ok) {
            console.error(`Error on feching ${url}: ${await response.text()}`)
        }

    } catch (error) {
        console.error(`Error on ${url}: ${error.message}`)
    }


}

async function getCharacterById(id) {
    
    try {
        
        const response = await fetch(`/api/characters/${id}`, {
            method: 'GET',
            headers: {'Content-type': 'application/json'}
        });



        if (response.ok) {
            
            const data = await response.json();

            chaName.value = data.name;
            chaImage.value = data.image;
            description.value = data.description;
            role.value = data.role;
            document.getElementById('imageDisplay').src = data.image;



        } else {
            console.error(`Error found when fetching: ${await response.text()}`)
        }

    } catch (error) {
        console.error(`Error found when trying to call getCharactersById: ${error.message}`)
    }
}