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
            console.log(await response.text());
        }
    } catch (error) {
        console.log(`Error found during fetch ${url}: ${error.message}`);
    }

}