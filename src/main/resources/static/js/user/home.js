// Load genres and ratings on page load
var page = 0;
var size = 10;

document.addEventListener('DOMContentLoaded', () => {
    getAllAnime(`/api/animes/paged?page=${page}&size=${size}&sort=name,asc`);

});

const tabs = document.querySelectorAll('.nav-link');
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tabs.forEach(t => t.classList.add('inactive'));
        tab.classList.add('active');
        tab.classList.remove('inactive');
    });
});