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