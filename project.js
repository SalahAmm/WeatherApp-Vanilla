// Create Fetch function 

// let location = prompt("Please Enter your Location" , `Blida`);
let location = `blida`;



const weatherFetchDate  = async (location) => {
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=S65Z6G3G5NS7GB4NSK2X3KEYB`

    try {
        let response = await fetch(url);
        let data = await response.json();
        return data;
    } catch(err) {
     console.log(err);
     }
}

async function wait () {
    const weatherData = await weatherFetchDate(location);
    console.log(weatherData)
}

wait();