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
            question: 'How do I add a new anime to the database?',
            answer: 'To add a new anime, click the "Add Anime" button on the main page.' + 
                    'Fill in the required fields, such as the anime\'s title, genre, release date,' +
                    ' and any other relevant information. Once completed, click "Submit" to save the anime to the database.'
        },
        {
            question: 'How can I edit an existing anime\'s information?',
            answer: 'Locate the anime you wish to edit in the list of anime. '+
            'Click the image above the anime\'s title. Make the necessary '+
            'changes in the provided form and click "Update" to save the modifications.'
        },
        {
            question: 'How do I delete an anime from the database?',
            answer: 'Find the anime you want to remove and click the "Delete" button next to its title.' +
                    'Confirm the deletion in the pop-up dialog box. The anime will be permanently removed from the database.'
        },
        {
            question: 'Can I search for specific anime in the database?',
            answer: 'Yes, you can use the search bar located at the top of the page to search for specific anime by their title,'+
            ' genre, or release date. Simply type in the search criteria, and the list will be filtered accordingly.'
        }
    ];

    faqs.forEach(faq => {
        const faqItem = createFAQ(faq.question, faq.answer);
        faqList.appendChild(faqItem);
    });
});

window.onload = () => {

    getAllAnime();
}