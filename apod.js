document.addEventListener('DOMContentLoaded', function() {
    fetch('https://api.nasa.gov/planetary/apod?api_key=t12RSX2Zbt8MPocUYVROIU7LERGoswde3gdOIafA')
        .then(response => response.json())
        .then(data => {
            document.getElementById('apod-image').src = data.url;
            document.getElementById('apod-title').textContent = data.title;
            document.getElementById('apod-description').textContent = data.explanation;
        })
        .catch(error => {
            console.error('Error fetching APOD:', error);

        });
           
});

function toggleImageSize() {
    var image = document.getElementById('apod-image');
    image.classList.toggle('large-image'); // Toggle the class to enlarge or shrink
}
