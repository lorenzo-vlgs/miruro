document.addEventListener('DOMContentLoaded', async () => {
    const data = await httpService.invoke('/api/studios/all', 'GET');
    if (data) {
        showStudios(data);
    }

});

function showStudios(data) {
    
    const element = document.getElementById('studios-list');

    let bodyHtml = '';

    for (let studio of data) {
        bodyHtml += `<div class="d-flex flex-column align-items-center">`;
        bodyHtml += `<img src="${studio.image}" alt="${studio.name}" class="img-fluid" style="width: 200px; height: auto; margin-top: 40px;">`;
        bodyHtml += `<p class='fw-semibold fs-3 studio-title text-center'>${studio.name}</p>`;
        bodyHtml += `<br>`;
        bodyHtml += `<div class="d-flex">`;
        bodyHtml += `<button class="btn btn-secondary me-2" onClick="redirectToForm(${studio.id})">Edit</button>`;
        bodyHtml += `<button class="btn btn-danger delete-button" data-id="${studio.id}" data-name="${studio.name}" data-bs-toggle="modal" data-bs-target="#studioDelete">Delete</button>`;
        bodyHtml += `</div>`;
        bodyHtml += `</div>`;

    }

    element.innerHTML = bodyHtml;

    // Add event listeners to the delete buttons
    // For each genre this dynamically give the id and name to the modal    
    const editButtons = document.querySelectorAll('.delete-button');
    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            const studioId = this.getAttribute('data-id');
            const studioName = this.getAttribute('data-name');
            document.getElementById('studioId').value = studioId;
            document.getElementById('studio-name').innerHTML = studioName;
        });
    });

}
//
// API RELATED
//
function deleteStudioBtn(){
    
    var modal = bootstrap.Modal.getInstance(document.getElementById('studioDelete'));
    modal.hide();
    
    let id = document.getElementById('studioId').value;
    
    let studioData = { "id": id};
    
    httpService.invoke('/api/studios/delete', 'POST', JSON.stringify(studioData));
    location.reload(); // Reload the page
}


//
// NON-API RELATED
//

// Dynamically populates the faq list
document.addEventListener('DOMContentLoaded', function() {
    const faqList = document.getElementById('faq-list');

    const faqs = [
        {
            question: 'How do I add a new studio?',
            answer: 'To add a new studio, navigate to the "Genres" section in the admin panel and click on the "Add New Genre" button. Fill in the required details, such as the studio name, and click "Save."'
        },
        {
            question: 'How do I edit an existing studio?',
            answer: 'To edit an existing studio, navigate to the "View All Studios" section in the admin panel. Find the studio you want to edit and click on the "Edit" button. Make the necessary changes and click "Save."'
        },
        {
            question: 'How do I delete a studio?',
            answer: 'To delete a studio, go to the "View All Studios" section in the admin panel. Find the studio you want to delete and click on the "Delete" button. Confirm the deletion when prompted.'
        },
        {
            question: 'How do I handle duplicate studios?',
            answer: 'If you find duplicate studios, you can merge them by editing one of the studios and updating its details to match the other. Then, delete the duplicate studio.'
        },
        {
            question: 'Is there a limit to the number of studios I can add?',
            answer: 'There is no specific limit to the number of studios you can add. However, it\'s a good practice to keep the list manageable and relevant to your content.'
        }
    ];

    faqs.forEach(faq => {
        const faqItem = createFAQ(faq.question, faq.answer);
        faqList.appendChild(faqItem);
    });

    
});

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