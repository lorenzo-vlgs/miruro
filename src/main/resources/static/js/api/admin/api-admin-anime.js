async function getAllAnime() {
    try {
        const response = await fetch(
            '/api/animes/all',
            {
                method: 'GET',
                headers: { "Content-Type": "application/json" }
            }
        );

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            const errorText = await response.text();
            console.error('Failed to fetch anime data:', errorText); // Log the error response
            return null;
        }
    } catch (error) {
        console.log('Error fetching animes: ' + error.message);
        return null;
    }
}

async function delAnime(id) {
    
    if (confirm(`Are you sure you want to delete this anime?`)) {
        deleteAnime(`/api/animes/delete`,id);
        location.reload();
    }
}

async function getAnime() {
    try {
        const response = await fetch(
            `/api/animes/${id}`,
            {
                method: 'GET',
                headers: { "Content-Type": "application/json" }
            }
        );

        if (response.ok) {
            const anime = await response.json();
            return anime; // Restituisci i dati dell'anime
        } else {
            const errorText = await response.text();
            console.error('Failed to fetch anime data:', errorText); // Log the error response
            return null;
        }
    } catch (error) {
        console.log('Error fetching animes: ' + error.message);
        return null;
    }
}

async function getGenres(url) {
    
    let data = {"test": "testino"};
    try {        
        const response = await fetch(url, {
            method: 'GET',
            headers: {'Content-type': 'application/json'}
        });

        if (response.ok) {
            data = await response.json();
        } else {
            console.error(`Error when fetching ${url}: ${await response.text()}`)
        }

    } catch (error) {
        console.error(`Error fetching animes on ${url}: ${error.message}`)    
    }

    return data;
}

async function getStudios(url) {
    
    let studioData = {"test": "testino"};

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {'Content-type': 'application/json'}
        });

        if (response.ok) {
            studioData = await response.json();
        } else {
            console.error(`Error when fetching ${url}: ${await response.text()}`)
        }
    } catch (error) {
        console.error(`Error fetching animes on ${url}: ${error.message}`)    
    }

    return studioData;
}

async function postAnime(url,animeData) {
    
    try {
        
        const response = await fetch(url, {
            method:'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(animeData)
        });
        
        if (response.ok) {
            console.log('Anime saved');
        } else {
            console.error(`Error during fetch: `, await response.text());
        }

    } catch (error) {
        console.error(`Error found when fetching: ${error.message}`)
    }
}

async function deleteAnime(url, id) {
    
    try {
        
        const response = await fetch(url, {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: id
        });

        if (!response.ok) {
            console.error(`Something didn't go well when fetching ${url}: ${await response.text()}`);
            return;
        }

    } catch (error) {
        console.error(`Error when fetching ${url}: ${error.message}`)
    }

}