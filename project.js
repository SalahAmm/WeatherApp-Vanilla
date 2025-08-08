// Get references to the HTML elements we'll be interacting with.
const weatherForm = document.getElementById('weather-form');
const locationInput = document.getElementById('location-input');
const weatherDisplay = document.getElementById('weather-display');

// Your API key for the Visual Crossing Weather API.
const apiKey = 'S65Z6G3G5NS7GB4NSK2X3KEYB';

// Add an event listener to the form to handle submission.
weatherForm.addEventListener('submit', async (e) => {
    // Prevent the default form submission behavior, which reloads the page.
    e.preventDefault();

    // Get the location from the input field.
    const location = locationInput.value;

    // Construct the API URL with the user's location and your API key.
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=${apiKey}&contentType=json`;

    // Clear previous weather data and show a loading message.
    weatherDisplay.innerHTML = `<p>Loading...</p>`;

    try {
        // Use the fetch function to make a request to the API.
        // 'await' pauses the function until the request is complete.
        const response = await fetch(url);

        // Check if the response from the server is not ok (e.g., 404 Not Found).
        if (!response.ok) {
            throw new Error('Location not found. Please try again.');
        }

        // Parse the JSON data from the response.
        // 'await' pauses the function until the data is parsed.
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
    // Update the weather-display div with the new weather information.
    weatherDisplay.innerHTML = `
        <h2>${data.resolvedAddress}</h2>
        <p><strong>Temperature:</strong> ${data.currentConditions.temp} °C</p>
        <p><strong>Conditions:</strong> ${data.currentConditions.conditions}</p>
        <p><strong>Humidity:</strong> ${data.currentConditions.humidity}%</p>
    `;
}