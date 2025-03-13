const containerUsername = document.getElementById('username-container');

let userId = null;

document.addEventListener('DOMContentLoaded', async () => {

    let data = await httpService.invoke(`/api/users/username`, 'GET');
    if (data) {
        containerUsername.innerText = data.username;
        userId = data.id;
    }

    data = await httpService.invoke('/api/status/all');
    getStatuses(data);

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

function changeFilter(statusId, name) {
    const listTitle = document.getElementById("list-count");

    const statusMap = {
        'Completed': ' Completed',
        'Dropped': ' Dropped',
        'On Hold': ' On Hold',
        'Watching': ' Currently Watching',
    };
    
    const stringa = statusMap[name] || ' No filter used';
    listTitle.innerHTML = stringa;
}
