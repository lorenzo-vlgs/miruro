// Get anime id
let idChar = "-1";
let idAnime = "0";

document.addEventListener('DOMContentLoaded', () => {
    // Get the 'id' parameter from the URL
    const urlParams = new URLSearchParams(window.location.search);
    // idChar = urlParams.get('idCharacter');
    idAnime = urlParams.get('id');

    if (urlParams.get('idChar')) {
        idChar = urlParams.get('idChar');
        console.log(" ID CHAR: " + idChar);
    }

    if (idChar > 0) getCharacterById(idChar);
    if (idAnime > 0) ;
});


//
// Updates the image as soon as a URL is entered in the input field
//
document.getElementById('chaImage').addEventListener('input', function() {

    // Displays the image after entering the URL in the input field
    const url = this.value;
    document.getElementById('imageDisplay').src = url;
});


document.getElementById('character-form').addEventListener('submit', function(event) {

    event.preventDefault();

    // Get all the informations
    const name = document.getElementById('chaName').value;
    const image = document.getElementById('chaImage').value;
    const description = document.getElementById('description').value;
    const role = document.getElementById('role').value;

    // Assemble the dictionary/json
    const animeData = {
        "id": idChar,
        "image": image,
        "name": name,
        "description": description,
        "role": role,
        "animeId": idAnime
    };

    // console.log(animeData);

    // Call the save/update call
    let url = idChar === "-1" ? '/api/characters/save' : '/api/characters/update';

    console.log(url);
    postCharacter(url, animeData);
    
    // Show alert and refresh page after 3 seconds
    showAlertAndRefresh();
    
});

function showAlertAndRefresh() {
    const alertPlaceholder = document.getElementById('alert-placeholder');
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert alert-success';
    alertDiv.role = 'alert';
    alertDiv.textContent = 'Character saved successfully!';
    alertPlaceholder.appendChild(alertDiv);

    setTimeout(() => {
        alertDiv.remove();
        location.reload();
    }, 3000);
}
