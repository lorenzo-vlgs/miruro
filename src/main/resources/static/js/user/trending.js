let selectedSeason = 'Winter'; // Default value
let year;

document.addEventListener('DOMContentLoaded', async () => {
    // Dynamically creates the season options
    getSeasons();

    // Dynamically populates the select with all the found years
    const years = await httpService.invoke(`/api/animes/years`, 'GET');
    getYearsOK(years);

    // Set the initial year value
    const yearsSelect = document.getElementById('years-select');
    year = yearsSelect.value;

    // Fetch initial anime data
    const initialData = await httpService.invoke(`/api/animes/trending?season=${selectedSeason}&year=${year}`, 'GET');
    updateAnimeList(initialData);

    // Add event listener for year change
    yearsSelect.addEventListener('change', async (event) => {
        year = event.target.value;
        const data = await httpService.invoke(`/api/animes/trending?season=${selectedSeason}&year=${year}`, 'GET');
        updateAnimeList(data);
    });
});

function getSeasons() { 
    const seasons = ['Winter', 'Spring', 'Summer', 'Fall'];
    const seasonsContainer = document.getElementById('seasons-container');

    // Generate the HTML content for the seasons
    let bodyHtml = '';
    seasons.forEach((season, index) => {
        bodyHtml += `<span class="season fs-2 fw-semibold ${index === 0 ? 'fw-bold' : 'text-secondary'}">${season}</span>`;
        if (index < seasons.length - 1) {
            bodyHtml += `<span class="separator fs-1 fw-semibold"> / </span>`;
        }
    });

    // Set the innerHTML of the seasons-container
    seasonsContainer.innerHTML = bodyHtml;

    // Add click event listeners to the season elements
    const seasonElements = document.querySelectorAll('.season');
    seasonElements.forEach(seasonElement => {
        seasonElement.addEventListener('click', async (event) => {
            selectedSeason = event.target.textContent;

            // Update the styles to reflect the selected season
            seasonElements.forEach(s => s.classList.remove('fw-bold', 'text-secondary'));
            event.target.classList.add('fw-bold');
            seasonElements.forEach(s => {
                if (s !== event.target) {
                    s.classList.add('text-secondary');
                }
            });

            // Fetch anime data for the selected season and year
            const data = await httpService.invoke(`/api/animes/trending?season=${selectedSeason}&year=${year}`, 'GET');
            updateAnimeList(data);
        });
    });
}

function getYearsOK(years) {
    const yearsSelect = document.getElementById('years-select');
    let optionsHtml = '';
    years.forEach(year => {
        optionsHtml += `<option value="${year}">${year}</option>`;
    });
    yearsSelect.innerHTML = optionsHtml;
}

function updateAnimeList(data) {
    const animeList = document.getElementById("anime-cards");
    let bodyHtml = '';

    for (let anime of data) {
        bodyHtml += `<div class="anime-card">`;
        bodyHtml += `<div class="anime-image"><img src="${anime.image}" alt="${anime.name}"></div>`;
        bodyHtml += `<div class="anime-details">`;
        bodyHtml += `<h2 class="anime-title">${anime.name}</h2>`;
        bodyHtml += `<div class="anime-categories">`;
        
        for (let category of anime.genres) {
            bodyHtml += `<span class="category">${category.genreName}</span>`;
        }
        
        bodyHtml += `</div>`;
        bodyHtml += `</div>`;
        bodyHtml += `</div>`;
    }

    animeList.innerHTML = bodyHtml;
}