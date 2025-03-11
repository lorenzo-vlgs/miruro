// Load genres and ratings on page load
var page = 0;
var size = 5;

document.addEventListener('DOMContentLoaded', () => {
    loadAnimePage(page);
});

function prevPage() {
    if (page > 0) {
        page--;
        loadAnimePage(page);
    } else {
        page = 0;
    }
}

async function nextPage() {
    const data = await httpService.invoke(`/api/animes/paged?page=${page + 1}&size=${size}&sort=name,asc`, 'GET');
    if (data && data.length > 0) {
        page++;
        updateAnimeList(data);
    } else {
        // Gestisci il caso in cui non ci sono più pagine
        console.log('No more pages available');
    }
}

async function loadAnimePage(page) {
    const data = await httpService.invoke(`/api/animes/paged?page=${page}&size=${size}&sort=name,asc`, 'GET');
    if (data) {
        updateAnimeList(data);
    }
}

function updateAnimeList(data) {
    const animeList = document.getElementById("anime-cards");
    let bodyHtml = '';

    for (let anime of data) {
        bodyHtml += `<div class="anime-card">`;
        bodyHtml += `<div class="anime-image">
            <img src="${anime.image}" alt="${anime.name}" onclick="redirectToAnime(${anime.id})">
            <button class="btn btn-sm btn-secondary position-absolute top-0 end-0 m-1 anime-button" style="display: none;" onclick="openModal(event, ${anime.id})"><i class="bi bi-plus-lg"></i></button>
            </div>`;
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

    // Add hover events to show/hide the button
    const animeContainers = document.querySelectorAll('.anime-card');
    animeContainers.forEach(container => {
        container.addEventListener('mouseenter', () => {
            container.querySelector('.anime-button').style.display = 'block';
        });
        container.addEventListener('mouseleave', () => {
            container.querySelector('.anime-button').style.display = 'none';
        });
    });
}

async function openModal(event, animeId) {
    event.stopPropagation(); // Prevent the click event from propagating to the parent elements

    const data = await httpService.invoke(`/api/auth/status`, 'GET');
    const authenticated = data.isAuthenticated;
    const modalDialog = document.querySelector('#animeModal .modal-dialog');
    const modalBody = document.getElementById('modalBody');

    let bodyHtml = '';

    if (authenticated) {
        bodyHtml += `
            <p>Welcome back! You are authenticated.</p>
        `;

        // CHANGE DIMENSION IF HE IS AUTHENTICATED
        modalDialog.classList.add('modal-lg');
        modalDialog.classList.remove('modal-sm');
    } else {
        bodyHtml += `
            <p class="text-center">Please log in or sign up</p>
            <div class='row justify-content-center'>
            <div class='col-6 text-center'>
                <a class='btn btn-outline-secondary' href="/login">Log In</a>
            </div>
            <div class='col-6 text-center'>
                <a class='btn btn-outline-secondary' href="/sign-up">Sign Up</a>
            </div>    
            </div>
        `;

        // CHANGE DIMENSION IF HE IS NOT AUTHENTICATED
        modalDialog.classList.add('modal-sm');
        modalDialog.classList.remove('modal-lg');
    }

    modalBody.innerHTML = bodyHtml;

    const myModal = new bootstrap.Modal(document.getElementById('animeModal'));
    myModal.show();
}

