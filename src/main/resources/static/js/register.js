document.getElementById("signUp").addEventListener("submit", function(event){
    event.preventDefault();

    let id = -1;
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let enabled = true;

    const userData = {
        "id": id,
        "username": username,
        "password": `{noop}${password}`,
        "enabled": enabled
    };

    // console.log(JSON.stringify(userData))
    signUp('/api/users/save',userData);

    window.location.href = "/login.html";
});

async function signUp(url,userData) {
    
    try {
        
        await fetch(url,{
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(userData)
        });

    } catch (error) {   
        console.log(`Error on fetching ${url}: ${error.message}`);
    }
}