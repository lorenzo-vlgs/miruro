document.getElementById('studioImage').addEventListener('input', function() {
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