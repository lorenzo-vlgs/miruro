document.addEventListener('DOMContentLoaded', async () => {

    const data = await httpService.invoke('/api/animes/all', 'GET');
    if (data) {
        showAnimeNames(data);
    }

});

/* JS STARTS HERE */
function delCharacter(id) {

    if (confirm('Are you sure you want to delete this character?')) {
        httpService.invoke(`/api/characters/delete` ,'POST' , id);
        location.reload();
    }
}

async function showAnimeNames(data) {

    const container = document.getElementById('anime-container');
    
    if (!container) {
        console.error("Element with ID 'anime-container' not found in the DOM.");
        return;
    }

    container.innerHTML = "";

    for (const anime of data) {
        const animeBlock = document.createElement('div');
        animeBlock.innerHTML = `
            <div class="fs-1 fw-semibold mb-3">${anime.name}</div>
            <button class="btn btn-secondary" onclick="redirectToCharacterForm(${anime.id})">+ Add character</button>
            <hr>
            <div class="container text-center">
                <div class="row justify-content-center" id="${anime.id}" style="margin-bottom:100px;"></div>
            </div>

        `;

        

        container.appendChild(animeBlock);

        // Fetch characters for this anime
        const characters = await httpService.invoke(`/api/characters/byAnime?idAnime=${anime.id}`, 'GET');
        if (characters) {
            showCharacters(characters, anime.id);
        }

    }
}

function showCharacters(characters, id){

    const container = document.getElementById(id.toString());

    if (!container) {
        console.error(`Container with ID '${id}' not found.`);
        return;
    }

    let bodyHtml = `<div class="row">`;

    characters.forEach((character, index) => {
        // Start a new row after every 6 characters
        if (index % 6 === 0 && index !== 0) {
            bodyHtml += `</div><div class="row">`;
        }

        bodyHtml += `
            <div class="col-2 d-flex flex-column align-items-center position-relative character-container">
                <a href="/admin/characters/form?idChar=${character.id}&id=${character.animeId}">
                    <img src="${character.image}" alt="${character.name}" class="img-fluid rounded"
                        style="width: 120px; height: 160px; object-fit: cover;">
                </a>
                <button class="btn btn-sm btn-secondary position-absolute top-1 end-1 m-1 character-button" style="display: none;" onclick="delCharacter(${character.id})"><i class="bi bi-trash"></i></button>
                <div class="fw-semibold fs-5 text-center mt-2">${character.name}</div>
                <div class="text-muted text-center">${character.role}</div>
            </div>
        `;
    });

    bodyHtml += `</div>`;

    container.innerHTML = bodyHtml;

    // Aggiungi eventi hover per mostrare/nascondere il pulsante
    const characterContainers = document.querySelectorAll('.character-container');
    characterContainers.forEach(container => {
        container.addEventListener('mouseenter', () => {
            container.querySelector('.character-button').style.display = 'block';
        });
        container.addEventListener('mouseleave', () => {
            container.querySelector('.character-button').style.display = 'none';
        });
    });

}



//
// CREAZIONE FAQ COME IN TUTTI ---------------------------------
//

function createFAQ(question, answer) {
    const faqContainer = document.createElement('div');
    faqContainer.classList.add('faq-item', 'mb-4');
    
    const questionElement = document.createElement('p');
    questionElement.classList.add('fw-bold', 'fs-2', 'bottom-outline');
    questionElement.textContent = question;
    
    const answerElement = document.createElement('p');
    answerElement.classList.add('half-75');
    answerElement.textContent = answer;
    
    faqContainer.appendChild(questionElement);
    faqContainer.appendChild(answerElement);
    
    return faqContainer;
}

// Dynamically populates the faq list
document.addEventListener('DOMContentLoaded', function() {
    const faqList = document.getElementById('faq-list');

    const faqs = [
        {
            question: 'How do I add a new character?',
            answer: 'To add a new character, navigate to the "Characters" section in the admin panel and click on the "Add New Character" button. Fill in the required details, such as the character name, and click "Save."'
        },
        {
            question: 'How do I edit an existing character?',
            answer: 'To edit an existing character, navigate to the "Characters" section in the admin panel. Find the character you want to edit and click on the "Edit" button. Make the necessary changes and click "Save."'
        },
        {
            question: 'How do I delete a character?',
            answer: 'To delete a character, go to the "Characters" section in the admin panel. Find the character you want to delete and click on the "Delete" button. Confirm the deletion when prompted.'
        },
        {
            question: 'How do I handle duplicate characters?',
            answer: 'If you find duplicate characters, you can merge them by editing one of the characters and updating its details to match the other. Then, delete the duplicate character.'
        },
        {
            question: 'Is there a limit to the number of characters I can add?',
            answer: 'There is no specific limit to the number of characters you can add. However, it\'s a good practice to keep the list manageable and relevant to your content.'
        }
    ];

    faqs.forEach(faq => {
        const faqItem = createFAQ(faq.question, faq.answer);
        faqList.appendChild(faqItem);
    });
});