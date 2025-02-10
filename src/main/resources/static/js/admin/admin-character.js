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
            question: 'How do I add a new genre?',
            answer: 'To add a new genre, navigate to the "Genres" section in the admin panel and click on the "Add New Genre" button. Fill in the required details, such as the genre name, and click "Save."'
        },
        {
            question: 'How do I edit an existing genre?',
            answer: 'To edit an existing genre, navigate to the "Genres" section     in the admin panel. Find the genre you want to edit and click on the "Edit" button. Make the necessary changes and click "Save."'
        },
        {
            question: 'How do I delete a genre?',
            answer: 'To delete a genre, go to the "Genres" section in the admin panel. Find the genre you want to delete and click on the "Delete" button. Confirm the deletion when prompted.'
        },
        {
            question: 'How do I handle duplicate genres?',
            answer: 'If you find duplicate genres, you can merge them by editing one of the genres and updating its details to match the other. Then, delete the duplicate genre.'
        },
        {
            question: 'Is there a limit to the number of genres I can add?',
            answer: 'There is no specific limit to the number of genres you can add. However, it\'s a good practice to keep the list manageable and relevant to your content.'
        }
    ];

    faqs.forEach(faq => {
        const faqItem = createFAQ(faq.question, faq.answer);
        faqList.appendChild(faqItem);
    });
});


window.onload = () => {
    getAnimeNames('/api/animes/all');
}