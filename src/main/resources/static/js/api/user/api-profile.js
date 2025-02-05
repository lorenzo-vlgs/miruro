// Variabili per ogni tag dinamico nella pagina profile
let profileName = document.getElementById('profile-name'); 

async function getUsername() {
    
    const response = await fetch(
        '/api/users/username',
        {
            method: 'GET',
            headers: {'Content-type': 'application/json'}
        }
    );

    const data = await response.json();

    console.log(JSON.stringify(data));
    profileName.innerHTML = data.username;
    

}

window.onload = getUsername;