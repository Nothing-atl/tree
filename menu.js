// menu.js

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