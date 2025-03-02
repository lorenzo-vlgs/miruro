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



 document.addEventListener('DOMContentLoaded', function() {
        getAnimeNames('/api/animes/all');
});

/* JS STARTS HERE */
function delCharacter(id) {
    
    if (confirm('Are you sure you want to delete this character?')) {
        deleteCharacter(`/api/characters/delete`,id);
        location.reload();
    }
}