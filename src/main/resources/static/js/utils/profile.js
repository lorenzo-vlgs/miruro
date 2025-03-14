const containerUsername = document.getElementById('username-container');

let userId = null;

document.addEventListener('DOMContentLoaded', async () => {
    let data = await httpService.invoke(`/api/users/username`, 'GET');
    if (data) {
        containerUsername.innerText = data.username;
        userId = data.id;
    }

    // Show the status selectable
    data = await httpService.invoke('/api/status/all', 'GET');
    getStatuses(data);

    // Show watching 
    changeFilter(1, 'Watching'); 
});

function getStatuses(data) {
    const statusContainer = document.getElementById("status-container");
    let bodyHtml = '';

    for (const status of data) {
        bodyHtml += `
            <div class="row">
                <button type="button" class="btn btn-dark border-bottom" onclick="changeFilter(${status.id}, '${status.name}')">
                    ${status.name}
                </button>
            </div>
        `;
    }
    statusContainer.innerHTML = bodyHtml;
}

async function changeFilter(statusId, name) {
    const listTitle = document.getElementById("list-count");

    const statusMap = {
        'Completed': ' Completed',
        'Dropped': ' Dropped',
        'On Hold': ' On Hold',
        'Watching': ' Currently Watching',
    };
    
    const stringa = statusMap[name] || ' No filter used';
    
    const data = await httpService.invoke(`/api/user-anime/search?statusId=${statusId}`, 'GET');
    if (data) showAnimeList(data);

    listTitle.innerHTML = data.length + " " + stringa;

}

async function showAnimeList(data) {
    const animeContainer = document.getElementById('anime-list-container');
    let bodyHtml = '';

    for (const userAnime of data) {
        const anime = await httpService.invoke(`/api/animes/${userAnime.id.animeId}`, 'GET'); // Fetch details for each anime

        bodyHtml += `
            <tr>
            <th class="text-center">
                <img src="${anime.image}" alt="${anime.name}" class="img-fluid" style="max-width: 40px; height: auto;" /> <!-- Display anime image with max width -->
            </th>
            <th class="text-center">
                ${anime.name} <!-- Display anime name -->
            </th>
            <th class="text-center">
                ${userAnime.score || 'N/A'} <!-- Score from UserAnime object -->
            </th>
            <th class="text-center">
                ${userAnime.startDate || 'Not Started'} <!-- Start date from UserAnime object -->
            </th>
            <th class="text-center">
                ${userAnime.endDate || 'Not Finished'} <!-- End date from UserAnime object -->
            </th>
            </tr>
        `;
    }

    animeContainer.innerHTML = bodyHtml; // Inject the table rows into the container
}