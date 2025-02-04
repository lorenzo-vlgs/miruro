document.getElementById('sign-up').addEventListener('submit', 
    function(event){
        event.preventDefault();

        let id = -1;
        let username = document.getElementById('username').value;
        let password = document.getElementById('password').value;
        let enabled = true;

        const userData = {
            "id": id,
            "username": username,
            "password": password,
            "enabled": enabled
        };

        signUp(userData);
    }
);

async function signUp(userData) {
    
}