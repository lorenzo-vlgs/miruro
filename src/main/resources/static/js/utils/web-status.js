async function getCount() {
    const endpoints = [
        { url: '/api/animes/count', elementId: 'animes' },
        { url: '/api/genres/count', elementId: 'genres' },
        { url: '/api/characters/count', elementId: 'chars' },
        { url: '/api/studios/count', elementId: 'studios' }
    ];

    for (const endpoint of endpoints) {
        const count = await httpService.invoke(endpoint.url, 'GET');
        if (count !== null) {
            document.getElementById(endpoint.elementId).innerHTML = count;
        }
    }
}

getCount();