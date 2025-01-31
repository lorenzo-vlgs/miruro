async function saveStudio(url,studioData) {
    
    try {
        
        const response = await fetch(url, {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(studioData)
        });

        if (response.ok) {
            console.log('Studio successfully saved');
        } else {
            console.log('Error when trying to get the response: ', response.text());
        }
    } catch (error) {
        console.log(`Error found during fetch ${url}: ${error.message}`);
    }

}

async function getStudio(url) {
    
    try {

        const response = await fetch(url, {
            method:'GET',
            headers: {'Content-type': 'application/json'}
        });
        
        let id = document.getElementById("studioId");
        let image = document.getElementById("studioImage");
        let name = document.getElementById("studioName");
        let description = document.getElementById("studioDescription");
        let dob = document.getElementById("studioDob");

        if (response.ok) {
            const data = await response.json();            

            id.value = data.id;
            image.value = data.image;
            name.value = data.name;
            description.value = data.description;
            dob.value = data.dob;
            
            document.getElementById('imageDisplay').src = data.image;

        } else {
            console.log('Error when trying to get the response: ', response.text());
        }
        
    } catch (error) {
        console.log(`Error found during fetch ${url}: ${error.message}`)
    }
}