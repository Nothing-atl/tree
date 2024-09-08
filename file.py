// script.js

// Wait for the DOM and SunCalc to load
document.addEventListener("DOMContentLoaded", () => {
    const moonImage = document.getElementById('moon-image');
    const phaseName = document.getElementById('phase-name');
    const dateDisplay = document.getElementById('date');

    // Function to get moon phase information
    function getMoonPhase() {
        const now = new Date();
        const moonIllumination = SunCalc.getMoonIllumination(now);
        const phase = moonIllumination.phase; // Value between 0 and 1
        const fraction = moonIllumination.fraction; // Illuminated fraction
        const angle = moonIllumination.angle; // Angle of the illuminated limb

        // Determine the phase name
        let phaseLabel = '';
        if (phase === 0 || phase === 1) {
            phaseLabel = 'New Moon';
        } else if (phase < 0.25) {
            phaseLabel = 'Waxing Crescent';
        } else if (phase === 0.25) {
            phaseLabel = 'First Quarter';
        } else if (phase < 0.5) {
            phaseLabel = 'Waxing Gibbous';
        } else if (phase === 0.5) {
            phaseLabel = 'Full Moon';
        } else if (phase < 0.75) {
            phaseLabel = 'Waning Gibbous';
        } else if (phase === 0.75) {
            phaseLabel = 'Last Quarter';
        } else {
            phaseLabel = 'Waning Crescent';
        }

        // Update the UI
        phaseName.textContent = phaseLabel;
        dateDisplay.textContent = `Date: ${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;

        // Set moon phase image based on phase
        const phaseImage = getPhaseImage(phaseLabel);
        moonImage.src = phaseImage;
        moonImage.alt = phaseLabel;
    }

    // Function to map phase names to images
    function getPhaseImage(phase) {
        // You need to have these images in an 'images' folder
        const phaseImages = {
            'New Moon': 'images/new_moon.png',
            'Waxing Crescent': 'images/waxing_crescent.png',
            'First Quarter': 'images/first_quarter.png',
            'Waxing Gibbous': 'images/waxing_gibbous.png',
            'Full Moon': 'images/full_moon.png',
            'Waning Gibbous': 'images/waning_gibbous.png',
            'Last Quarter': 'images/last_quarter.png',
            'Waning Crescent': 'images/waning_crescent.png'
        };
        return phaseImages[phase] || 'images/new_moon.png';
    }

    // Initial call
    getMoonPhase();

    // Update every hour
    setInterval(getMoonPhase, 3600000);
});//








/* style.css */

/* Background video settings */
#background-video {
    position: fixed;
    right: 0;
    bottom: 0;
    min-width: 100%; 
    min-height: 100%;
    z-index: -1; /* Keeps the video behind the content */
    object-fit: contain;
}

/* General reset for consistent look across browsers */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family:'Poppins', sans-serif;
}

body {
    font-family: 'Roboto', sans-serif;
    color: #f5f5f5;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
    position: relative;
    overflow: hidden;
}

/* Container for the content */
.container {
    background-color: rgba(34, 40, 49, 0.7); /* Semi-transparent container */
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
    max-width: 500px;
    text-align: center;
    z-index: 1; /* Ensure it's above the video */
}

/* Header styling */
h1 {
    font-size: 2rem;
    margin-bottom: 20px;
    color: #ffd369;
}

/* Moon image styling */
#moon-image {
    width: 100%;
    max-width: 300px;
    border-radius: 50%;
    margin: 20px auto;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.5);
}

/* Moon phase name */
#phase-name {
    font-size: 1.5rem;
    margin-top: 10px;
    font-weight: 700;
    color: #ffd369;
}

/* Additional moon information */
#moon-info {
    margin-top: 20px;
    font-size: 1rem;
    line-height: 1.5;
}

/* Location information */
#location {
    margin-top: 10px;
    font-size: 1rem;
    color: #eeeeee;
}

/* Date styling */
#date {
    margin-top: 15px;
    font-size: 1rem;
    color: #dddddd;
} 
