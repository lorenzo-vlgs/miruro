let id = document.getElementById("studioId");
let image = document.getElementById("studioImage");
let name = document.getElementById("studioName");
let description = document.getElementById("studioDescription");
let dob = document.getElementById("studioDob");

document.addEventListener('DOMContentLoaded', async () => {

    // Ricava dall'url l'id dello studio
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    if (id > 0) {
        const data = await httpService.invoke(`/api/studios/${id}`, 'GET');
        if (data) {
            id.valueOf = data.id;
            image.value = data.image;
            name.value = data.name;
            description.value = data.description;
            dob.value = data.dob;
            
            document.getElementById('imageDisplay').src = data.image;

        }
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

    httpService.invoke(url, 'POST', JSON.stringify(studioData));

    window.location.href = `/admin/studios`;
});