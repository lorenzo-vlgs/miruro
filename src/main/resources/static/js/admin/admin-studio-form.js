document.addEventListener('DOMContentLoaded', () => {

    // Ricava dall'url l'id dello studio
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    if (id > 0) {
        getStudio(`/api/studios/${id}`);

    }
    
});

document.getElementById('studioImage').addEventListener('input', function() {

    // Serve a mostrare l'immagine dopo aver inserito l'url nell'input
    const url = this.value;
    document.getElementById('imageDisplay').src = url;
});


document.getElementById('saveStudio').addEventListener('submit', function(event) {
    event.preventDefault();

    // Un approccio diverso per passare i dati dalla form in un formato json
    let id = document.getElementById("studioId").value;
    let image = document.getElementById("studioImage").value;
    let name = document.getElementById("studioName").value;
    let description = document.getElementById("studioDescription").value;
    let dob = document.getElementById("studioDob").value;

    let studioData = {
        "id" : id,
        "image": image,
        "name": name,
        "description": description,
        "dob": dob
    }

    let url = id === "-1" ? '/api/studios/save' : '/api/studios/update';

    saveStudio(url, studioData);

    window.location.href = `/admin/studios`;
});