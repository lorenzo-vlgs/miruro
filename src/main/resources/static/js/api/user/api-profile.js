async function getUsername() {
    
    const response = await fetch(
        '/api/users/hello',
        {
            method: 'GET',
            headers: {'Content-type': 'application/json'}
        }
    );

    const data = await response.json();

    console.log(JSON.stringify(data));

}

window.onload = getUsername;