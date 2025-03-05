async function fetchAnimeDetails(id) {
    try {
        const response = await fetch(
            `api/animes/${id}`,
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

