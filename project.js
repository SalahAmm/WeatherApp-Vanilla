const weatherForm = document.getElementById('weather-form');
const locationInput = document.getElementById('location-input');
const weatherDisplay = document.getElementById('weather-display');

const apiKey = 'S65Z6G3G5NS7GB4NSK2X3KEYB';
//dont worry it just free key;

weatherForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get the location from the input field.
    const location = locationInput.value;

    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=${apiKey}&contentType=json`;

    // Clear previous weather data and show a loading message.
    weatherDisplay.innerHTML = `<p>Loading...</p>`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Location not found. Please try again.');
        }

        // Parse the JSON data from the response.
        const data = await response.json();

        // Display the weather information.
        displayWeather(data);

    } catch (error) {
        // If any error occurs during the fetch or processing, display an error message.
        weatherDisplay.innerHTML = `<p>${error.message}</p>`;
        console.error('Error fetching weather data:', error);
    }
});

// Function to display the weather data on the page.
const displayWeather = (data) => {
    weatherDisplay.innerHTML = `
        <h2>${data.resolvedAddress}</h2>
        <p><strong>Temperature:</strong> ${data.currentConditions.temp} °C</p>
        <p><strong>Conditions:</strong> ${data.currentConditions.conditions}</p>
        <p><strong>Humidity:</strong> ${data.currentConditions.humidity}%</p>
    `;
}