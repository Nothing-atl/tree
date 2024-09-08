const apiUrl = 'https://api.astronomyapi.com/api/v2/studio/moon-phase';
const apiKey = 'your-api-key-here';  // my API key(no need)
const authString = btoa(`8b4d75a6-b545-4269-891f-0d44694c483d:a099c3782dd7c8c2416b7cf243104a583d6bbb058c7a9641bde620f3305b69dab0cec4d9e3cb923dd9d7c26593c1482b936014cecdfb46310e1cc9a70d404d7fda049879f6b86f2f8f8f40c604effa29ad87fbc8613234d9d21c326ff2dda30612a7ec2977bb9f34b1302c713b1bdeff`);

const clock12 = document.getElementById('clock12')
const clock24 = document.getElementById('clock24')

// Concatenate a zero to the left of every single digit time frame
function concatZero(timeFrame) {
  return timeFrame < 10 ? '0'.concat(timeFrame) : timeFrame
}

function realTime() {
  let date = new Date()
  let sec = date.getSeconds()
  let mon = date.getMinutes()
  let hr = date.getHours()
  // 12 hour time
  // If the hour equals 0 or 12, the remainder equals 0, so output 12 instead. (0 || 12 = 12)
  clock12.textContent = `${concatZero((hr % 12) || 12)} : ${concatZero(mon)} : ${concatZero(sec)} ${hr >= 12 ? 'PM' : 'AM'}`
  // 24 hour time
  clock24.textContent = `${concatZero(hr)} : ${concatZero(mon)} : ${concatZero(sec)}`
}

setInterval(realTime, 1000)






document.addEventListener('DOMContentLoaded', () => {
    // Function to get moon phase information
    const phaseName = document.getElementById('phase-name');
    const dateDisplay = document.getElementById('date');
    const moonImage = document.getElementById('moon-image');

    // Fetch moon phase image from API
    function getLocationAndFetchMoonPhase() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
                fetchMoonPhaseImage(latitude, longitude);
            }, error => {
                console.error('Error getting location:', error);
                fetchMoonPhaseImage(0, 0); // Fallback to default coordinates if location access fails
            });
        } else {
            console.error('Geolocation is not supported by this browser.');
            fetchMoonPhaseImage(0, 0); // Fallback to default coordinates
        }
    }

    async function fetchMoonPhaseImage(latitude, longitude) {
        const requestBody = {
            "format": "png",
            "style": {
                "moonStyle": "sketch",
                "backgroundStyle": "solid",
                "backgroundColor": "black",
                "headingColor": "brown",
                "textColor": "white"
            },
            "observer": {
                "latitude": latitude,
                "longitude": longitude,
                "date": new Date().toLocaleDateString('en-CA') // Current date in "YYYY-MM-DD" format
            },
            "view": {
                "type": "portrait-simple",
                "orientation": "south-up"
            }
        };

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Authorization': `Basic ${authString}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });

            if (response.ok) {
                const data = await response.json();
                const moonImageUrl = data.data.imageUrl;
                document.getElementById('moon-image').src = moonImageUrl;

                console.log("Moon image URL: ", moonImageUrl);

            } else {
                console.error('Error:', response.statusText);
            }

        } catch (error) {
            console.error('Error fetching moon phase image:', error);
        }
    }

    // Get moon phase information locally using SunCalc library
    function getMoonPhase() {
        const now = new Date();
        const moonIllumination = SunCalc.getMoonIllumination(now);
        //console.log("Moon Illumination:", moonIllumination); // Check the structure
        const phase = moonIllumination.phase; // Value between 0 and 1
        //console.log("Phase:", phase);

        // Determine the phase name
        let phaseLabel = '';
        if (phase <= 0.05 || phase >= 0.95) {
            phaseLabel = 'New Moon';
        } else if (phase < 0.25) {
            phaseLabel = 'Waxing Crescent';
        } else if (phase < 0.30) {
            phaseLabel = 'First Quarter'; // Approximate range for First Quarter
        } else if (phase < 0.50) {
            phaseLabel = 'Waxing Gibbous';
        } else if (phase <= 0.55) {
            phaseLabel = 'Full Moon'; // Approximate range for Full Moon
        } else if (phase < 0.75) {
            phaseLabel = 'Waning Gibbous';
        } else if (phase < 0.80) {
            phaseLabel = 'Last Quarter'; // Approximate range for Last Quarter
        } else {
            phaseLabel = 'Waning Crescent';
        }

        // Update the UI
        phaseName.textContent = phaseLabel;
        //dateDisplay.textContent = `Date: ${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
    }

    // Initial call to functions
    getLocationAndFetchMoonPhase();
    getMoonPhase();

    // Update every hour
    setInterval(getMoonPhase, 3600000);

    

    

});
