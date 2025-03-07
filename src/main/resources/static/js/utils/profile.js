const containerUsername = document.getElementById('username-container');

document.addEventListener('DOMContentLoaded', async () => {

    const data = await httpService.invoke(`/api/users/username`, 'GET');
    if (data) {
        containerUsername.innerText = data.username;
    }
});