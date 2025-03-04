async function getAllAnime(url) {
    try {
        const response = await fetch(
            url,
            {
                method: 'GET',
                headers: { "Content-Type": "application/json" }
            }
        );

        if (response.ok) {
            const data = await response.json();
            return data; // Restituisci i dati
        } else {
            const errorText = await response.text();
            console.error('Failed to fetch anime data:', errorText); // Log the error response
            return null;
        }
    } catch (error) {
        console.error('Error fetching animes: ' + error.message);
        return null;
    }
}