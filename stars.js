// script.js

// script.js

function toggleDetails(id) {
    const details = document.getElementById(id);
    
    // Toggle the 'show' class to expand/collapse the details section
    if (details.classList.contains('show')) {
        details.classList.remove('show');
    } else {
        details.classList.add('show');
    }
}
function toggleImageSize() {
    var image = document.getElementById('star-finder');
    image.classList.toggle('large-image'); // Toggle the class to enlarge or shrink
}



function toggleMenu() {
    var nav = document.getElementById('site-navigation');
    if (nav.classList.contains('active')) {
        nav.classList.remove('active');
    } else {
        nav.classList.add('active');
    }
}



// Close menu when clicking outside of it
document.addEventListener('click', function(event) {
    var nav = document.getElementById('site-navigation');
    var menuIcon = document.querySelector('.menu-icon');
    
    // Check if the clicked area is outside the menu and the menu icon
    if (!nav.contains(event.target) && !menuIcon.contains(event.target)) {
        nav.classList.remove('active');
    }
});