document.addEventListener('DOMContentLoaded', async function() {

    const data = await httpService.invoke('/api/genres/all', 'GET');
    if (data) {
        showGenres(data);
    }
});

//
// API RELATED
//
function showGenres(data){

    const element = document.getElementById('genres-list');
    var bodyHtml = '';

    for (let genre of data) {
        bodyHtml += `<div>`;
        bodyHtml += `<p class='fw-semibold fs-3' style='margin-top: 30px'>${genre.genreName}</p>`;
        bodyHtml += `<br>`;
        bodyHtml += `<button class="btn btn-secondary me-2 edit-button" data-name="${genre.genreName}" data-id="${genre.id}" data-bs-toggle="modal" data-bs-target="#editGenre">Edit</button>`;
        bodyHtml += `<button class="btn btn-danger delete-button" data-name="${genre.genreName}" data-id="${genre.id}" data-bs-toggle="modal" data-bs-target="#deleteGenre">Delete</button>`;
        bodyHtml += `</div>`;
    }

    element.innerHTML = bodyHtml;

    // Add event listeners to the edit buttons
    // For each genre this dynamically give the id and name to the modal
    const editButtons = document.querySelectorAll('.edit-button');
    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            const genreId = this.getAttribute('data-id');
            const genreName = this.getAttribute('data-name');
            document.getElementById('genreId').value = genreId;
            document.getElementById('genre-name').innerHTML = genreName;
        });
    });

    const deleteButtons = document.querySelectorAll('.delete-button');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const genreId = this.getAttribute('data-id');
            const genreName = this.getAttribute('data-name');
            document.getElementById('genreIdDelete').value = genreId;
            document.getElementById('genre-name-delete').innerHTML = genreName;
        });
    });

}

//
// NON-API RELATED
//
document.getElementById('genre-form').addEventListener('submit', function(event) {
    event.preventDefault();

    var modal = bootstrap.Modal.getInstance(document.getElementById('saveGenre'));
    modal.hide();

    var alert = document.getElementById('success-alert');
    alert.style.display = 'block';
    console.log('Alert displayed'); // Debugging line

    setTimeout(function() {
        alert.style.display = 'none';
        console.log('Alert hidden'); // Debugging line
        location.reload(); // Reload the page
    }, 3000);

    const genre = document.getElementById('genre').value;
    const genreData = { "genreName": genre}

    httpService.invoke('/api/genres/save', 'POST', JSON.stringify(genreData));
});

document.getElementById('edit-genre-form').addEventListener('submit', function(event) {
    event.preventDefault();

    var modal = bootstrap.Modal.getInstance(document.getElementById('editGenre'));
    modal.hide();

    var alert = document.getElementById('success-alert');
    alert.style.display = 'block';
    console.log('Alert displayed'); // Debugging line

    setTimeout(function() {
        alert.style.display = 'none';
        console.log('Alert hidden'); // Debugging line
        location.reload(); // Reload the page
    }, 3000);

    let id = document.getElementById('genreId').value;
    let genreName = document.getElementById('genreName').value;

    let genreData = {
        "id": id,
        "genreName": genreName
    };

    httpService.invoke('/api/genres/update', 'POST', JSON.stringify(genreData));
    
});

document.getElementById('delete-genre-form').addEventListener('submit', function(event) {
    event.preventDefault();

    var modal = bootstrap.Modal.getInstance(document.getElementById('deleteGenre'));
    modal.hide();
    
    let id = document.getElementById('genreIdDelete').value;

    let genreData = { "id": id};

    httpService.invoke('/api/genres/delete', 'POST', JSON.stringify(genreData));
    location.reload(); // Reload the page
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