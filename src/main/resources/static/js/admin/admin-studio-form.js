document.getElementById('studioImage').addEventListener('input', function() {
    const url = this.value;
    document.getElementById('imageDisplay').src = url;
});