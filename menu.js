// menu.js

function toggleMenu() {
    var nav = document.getElementById('site-navigation');
    if (nav.classList.contains('active')) {
        nav.classList.remove('active');
    } else {
        nav.classList.add('active');
    }
}
