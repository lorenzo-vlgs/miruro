async function fetchCount(url, elementId) {
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: { "Content-Type": "application/json" }
        });


        
        if (response.ok) {
            
            const data = await response.json();
            if (elementId) {
                const element = document.getElementById(elementId);
                element.innerHTML = data;
            }

        } else {
            const errorText = await response.text();
            console.error(`Failed to fetch data from ${url}:`, errorText);
        }
    } catch (error) {
        console.log(`Error fetching data from ${url}: ${error.message}`);
    }
}

async function getCount() {
    await fetchCount('api/animes/count', 'animes');
    await fetchCount('api/genres/count', 'genres');
    await fetchCount('api/characters/count', 'chars');
    await fetchCount('api/studios/count', 'studios');
}

getCount();