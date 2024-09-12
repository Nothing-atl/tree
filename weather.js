
    // Your WeatherAPI key
    const apiKey = 'dac00fba5af1430a8af15139240809'; // Replace with your actual API key

    // Function to get user's location using Geolocation API
    function getUserLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(fetchWeatherData, showError);
        } else {
            document.getElementById('weather-info').innerHTML = `
                <p>Geolocation is not supported by this browser.</p>
            `;
        }
    }

    // Fetch weather data using latitude and longitude
    function fetchWeatherData(position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        // Fetch weather data from WeatherAPI using latitude and longitude
        fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}&aqi=no`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Extract relevant weather data
            const temp = data.current.temp_c; // Temperature in Celsius
            //const humidity = data.current.humidity; // Humidity percentage
            const windSpeed = data.current.wind_kph; // Wind speed in km/h
            //const condition = data.current.condition.text; // Weather condition description
            //const icon = data.current.condition.icon; // Weather condition icon

            // Display the weather data
            document.getElementById('weather-info').innerHTML = `
                <div><strong>Location:</strong> ${data.location.name}, ${data.location.country}</div>
                <div><strong>Temperature:</strong> ${temp} °C</div>
                
            `;
        }) /*<div><strong>Humidity:</strong> ${humidity} %</div>
        <div><strong>Wind Speed:</strong> ${windSpeed} km/h</div>
        <div><strong>Condition:</strong> ${condition}</div>
        <img src="${icon}" alt="Weather icon">*/
        
        .catch(error => {
            document.getElementById('weather-info').innerHTML = `
                <p>Error fetching weather data. Please try again later.</p>
            `;
            console.error('Error:', error); // Log the error
        });
    }

    // Handle geolocation errors
    function showError(error) {
        let errorMessage = '';
        switch(error.code) {
            case error.PERMISSION_DENIED:
                errorMessage = 'User denied the request for Geolocation.';
                break;
            case error.POSITION_UNAVAILABLE:
                errorMessage = 'Location information is unavailable.';
                break;
            case error.TIMEOUT:
                errorMessage = 'The request to get user location timed out.';
                break;
            case error.UNKNOWN_ERROR:
                errorMessage = 'An unknown error occurred.';
                break;
        }
        document.getElementById('weather-info').innerHTML = `<p>${errorMessage}</p>`;
    }

    // Call the function to get the user's location and fetch weather data
    getUserLocation();



    /*const apiKey = 'FB4WLYJ92TR2TBQQ5V8B9ADQW';  // Replace with your Visual Crossing API Key
    const city = 'London,UK';

    fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=us&key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            console.log('15-day Forecast:', data);
            document.getElementById('forecast-info').innerHTML = `
                <h2>15-day Forecast for ${data.address}</h2>
                <p>Temperature: ${data.days[0].temp} °F</p>
                <p>Conditions: ${data.days[0].conditions}</p>
            `;
        })
        .catch(error => console.error('Error fetching forecast:', error));


        fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/London%2CUK/last7days?unitGroup=metric&key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            console.log('Last 7 Days Hourly Data:', data);
            let hourlyHtml = '<h2>Last 7 Days Hourly Data</h2><ul>';
            data.days.forEach(day => {
                day.hours.forEach(hour => {
                    hourlyHtml += `<li>${hour.datetime}: ${hour.temp} °C</li>`;
                });
            });
            hourlyHtml += '</ul>';
            document.getElementById('hourly-info').innerHTML = hourlyHtml;
        })
        .catch(error => console.error('Error fetching hourly data:', error));


        fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/London%2CUK/2022-07-15/2022-07-20?unitGroup=metric&key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            console.log('Historical Data:', data);
            let historicalHtml = `<h2>Historical Data for ${data.address}</h2><ul>`;
            data.days.forEach(day => {
                historicalHtml += `
                    <li>Date: ${day.datetime}
                    <br>Temperature: ${day.temp} °C
                    <br>Conditions: ${day.conditions}</li>`;
            });
            historicalHtml += '</ul>';
            document.getElementById('historical-info').innerHTML = historicalHtml;
        })
        .catch(error => console.error('Error fetching historical data:', error));

        function downloadCSV() {
            const csvUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/London%2CUK/2022-07-15/2022-07-20?unitGroup=metric&contentType=csv&include=days&key=${apiKey}`;
            window.open(csvUrl, '_blank');
        }
        */

        /*document.addEventListener("DOMContentLoaded", function() {
            const apiKey = 'FB4WLYJ92TR2TBQQ5V8B9ADQW';  // Replace with your Visual Crossing API Key
            
            function getLocation() {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(fetchWeatherData, showError);
                } else {
                    document.getElementById('weather-info').innerHTML = 'Geolocation is not supported by this browser.';
                }
            }

            function fetchWeatherData(position) {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                const location = `${lat},${lon}`;
                
                fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${apiKey}`)
                .then(response => response.json())
                .then(data => {
                    // Extract relevant weather data
                    const tempFahrenheit = data.currentConditions.temp; // Temperature in Fahrenheit
                    const humidity = data.currentConditions.humidity; // Humidity
                    const windSpeed = data.currentConditions.windspeed; // Wind Speed
                    const conditions = data.currentConditions.conditions; // Conditions (Clear, Cloudy, etc.)

                    const tempCelsius = (tempFahrenheit - 32) * 5 / 9;
                    // Display the weather data
                    document.getElementById('weather-info').innerHTML = `
                    <div class="weather-item"><strong>Location:</strong> ${data.address}</div>
                        <div class="weather-item"><strong>Temperature:</strong> ${tempCelsius.toFixed(1)} °C</div>
                        <div class="weather-item"><strong>Humidity:</strong> ${humidity} %</div>
                        <div class="weather-item"><strong>Wind Speed:</strong> ${windSpeed} km/h</div>
                        <div class="weather-item"><strong>Conditions:</strong> ${conditions}</div>
                    `;

                    // Handle hourly data
                    const hourlyData = data.days[0].hours; // Hourly data for the current day
                    let hourlyHtml = '<ul>';
                    hourlyData.forEach(hour => {
                        const hourlyTempFahrenheit = hour.temp; // Hourly temperature in Fahrenheit
                        const hourlyTempCelsius = (hourlyTempFahrenheit - 32) * 5 / 9;
                        hourlyHtml += `
                            <li class="hourly-item"><strong>${hour.datetime}</strong>: ${hourlyTempCelsius.toFixed(1)} °C</li>
                        `;
                    });
                    hourlyHtml += '</ul>';
                    document.getElementById('hourly-info').innerHTML = hourlyHtml;
                })
                .catch(error => {
                    document.getElementById('weather-info').innerHTML = `
                        <p>Error fetching weather data. Please try again later.</p>
                    `;
                    console.error('Error:', error);
                });
            }

            function showError(error) {
                switch(error.code) {
                    case error.PERMISSION_DENIED:
                        document.getElementById('weather-info').innerHTML = "User denied the request for Geolocation.";
                        break;
                    case error.POSITION_UNAVAILABLE:
                        document.getElementById('weather-info').innerHTML = "Location information is unavailable.";
                        break;
                    case error.TIMEOUT:
                        document.getElementById('weather-info').innerHTML = "The request to get user location timed out.";
                        break;
                    case error.UNKNOWN_ERROR:
                        document.getElementById('weather-info').innerHTML = "An unknown error occurred.";
                        break;
                }
            }

            // Get the current location when the page loads
            getLocation();
        });
        */

        document.addEventListener("DOMContentLoaded", function() {
            const apiKey = 'dac00fba5af1430a8af15139240809';  // Replace with your WeatherAPI Key
            const location = 'Burnaby';  // You can replace this with any location
            
 
            

            // Fetch weather data from WeatherAPI
            fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=1&hourly=1`)
            .then(response => response.json())
            .then(data => {
                // Extract relevant weather data
                const current = data.current;
                const locationName = data.location.name;
                const country = data.location.country;
                
               /* // Display current weather data
                document.getElementById('weather-info').innerHTML = `
                    <div class="weather-item"><strong>Location:</strong> ${locationName}, ${country}</div>
                    <div class="weather-item"><strong>Temperature:</strong> ${current.temp_c} °C</div>
                    <div class="weather-item"><strong>Humidity:</strong> ${current.humidity} %</div>
                    <div class="weather-item"><strong>Wind Speed:</strong> ${current.wind_kph} km/h</div>
                    <div class="weather-item"><strong>Conditions:</strong> ${current.condition.text}</div>
                `;
                */
                // Handle hourly data
                const hourlyData = data.forecast.forecastday[0].hour;
                let hourlyHtml = '<ul>';
                hourlyData.forEach(hour => {
                    hourlyHtml += `
                        <li><strong>${hour.time}</strong>: ${hour.temp_c} °C</li>
                    `;
                });
                hourlyHtml += '</ul>';
                document.getElementById('hourly-info').innerHTML = hourlyHtml;
            })
            .catch(error => {
                document.getElementById('weather-info').innerHTML = `
                    <p>Error fetching weather data. Please try again later.</p>
                `;
                console.error('Error:', error);
            });

            
        });
        
