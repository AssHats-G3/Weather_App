// FetchLocationData() ISSUE: 8

// Define default latitude and longitude values (Copenhagen)
let defaultLatitude = 55.6761;
let defaultLongitude = 12.5683;

// Define variables for latitude and longitude
let latitude;
let longitude;

// Function to get the user's location or use default values
function getLocation() {
  // Call another function or perform actions with latitude and longitude
  handleLocation(latitude, longitude);
}

// Function to handle the location (replace with your own logic)
function handleLocation(latitude, longitude) {
  console.log("Latitude: " + latitude);
  console.log("Longitude: " + longitude);

  // Your code to use the latitude and longitude here
  findNearestCity(latitude, longitude);
}

// Function to find the nearest city or town using OpenCage Geocoding API
function findNearestCity(latitude, longitude) {
  // Your OpenCage API Key
  const apiKey = 'd2ff6a023f11473d9533c806b6da6aba';

  // Make an API request to OpenCage Geocoding API
  const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}&language=en&pretty=1`;

  fetch(apiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // Extract and handle the location information from the API response
      const results = data.results;

      if (results.length > 0) {
        const firstResult = results[0];
        const city = firstResult.components.city || firstResult.components.town || firstResult.components.village;

        if (city) {
          console.log('City:', city);
        } else {
          console.log('No city or town found.');
        }
      } else {
        console.log('No results found.');
      }
    })
    .catch(function (error) {
      console.error('Error:', error);
    });
}


// Define your OpenCage API key
  const openCageApiKey = 'd2ff6a023f11473d9533c806b6da6aba';


// Get references to HTML elements
const cityInput = document.getElementById('cityInput');
const searchButton = document.getElementById('searchButton');

// Add an event listener to the search button
searchButton.addEventListener('click', () => {
  // Get the city name from the input field
  const cityName = cityInput.value;

  // Construct the URL for the OpenCage Geocoding API
  const openCageApiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
    cityName
  )}&key=${openCageApiKey}&language=en&pretty=1`;

  // Make a request to the OpenCage Geocoding API
  fetch(openCageApiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      // Extract latitude and longitude from the API response
      if (data.results.length > 0) {
        const location = data.results[0].geometry;
        const latitude = location.lat;
        const longitude = location.lng;

        // Use latitude and longitude in your application (e.g., fetch weather data)
        console.log(`City: ${cityName}`);
        console.log(`Latitude: ${latitude}`);
        console.log(`Longitude: ${longitude}`);

        // You can make additional API calls or perform other actions here
      } else {
        console.error('No results found for the city:', cityName);
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
});

// Current WEATHER DATA_med relevant udtræk og rigtige måleenheder. issue:28
// Function to convert wind direction in degrees to compass direction
function degreesToCompass(degrees) {
  const compassDirections = [
    "N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE",
    "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW", "N"
  ];

  // Ensure degrees are between 0 and 360
  degrees = (degrees + 360) % 360;

  // Calculate the index in the compassDirections array
  const index = Math.round(degrees / 22.5);

  // Return the compass direction
  return compassDirections[index];
}

// Function to convert wind speed to Beaufort scale
function windSpeedToBeaufort(windSpeed) {
  if (windSpeed < 0.5) {
    return 0; // Calm
  } else if (windSpeed < 1.5) {
    return 1; // Light air
  } else if (windSpeed < 3.3) {
    return 2; // Light breeze
  } else if (windSpeed < 5.5) {
    return 3; // Gentle breeze
  } else if (windSpeed < 7.9) {
    return 4; // Moderate breeze
  } else if (windSpeed < 10.7) {
    return 5; // Fresh breeze
  } else if (windSpeed < 13.8) {
    return 6; // Strong breeze
  } else if (windSpeed < 17.1) {
    return 7; // Near gale
  } else if (windSpeed < 20.7) {
    return 8; // Gale
  } else if (windSpeed < 24.4) {
    return 9; // Strong gale
  } else if (windSpeed < 28.4) {
    return 10; // Storm
  } else if (windSpeed < 32.6) {
    return 11; // Violent storm
  } else {
    return 12; // Hurricane
  }
}

// Function to get current weather data
function getCurrentWeather() {
  const apiKey = '1c8284d2cba51f9f680a3c09e5602ea8';
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      // Extract and display the desired weather data
      const temperature = data.main.temp;
      const windSpeed = data.wind.speed;
      const windDirection = data.wind.deg;
      const sunriseTimestamp = data.sys.sunrise * 1000; // Convert to milliseconds
      const sunsetTimestamp = data.sys.sunset * 1000; // Convert to milliseconds

      // Convert wind speed to Beaufort scale
      const beaufortScale = windSpeedToBeaufort(windSpeed);

      // Convert wind direction to compass direction
      const compassDirection = degreesToCompass(windDirection);

      // You can convert timestamps to readable dates and times using JavaScript Date objects
      const sunriseTime = new Date(sunriseTimestamp).toLocaleTimeString();
      const sunsetTime = new Date(sunsetTimestamp).toLocaleTimeString();

      // Display the weather data
      console.log('Temperature:', temperature, 'C'); // Temperature in Celsius
      console.log('Wind Speed:', windSpeed, 'm/s');
      console.log('Wind Speed (Beaufort):', beaufortScale);
      console.log('Wind Direction:', compassDirection);
      console.log('Sunrise:', sunriseTime);
      console.log('Sunset:', sunsetTime);

      // Combine sunrise and sunset times into a single string
      const sunriseAndSunset = `Sunrise: ${sunriseTime}, Sunset: ${sunsetTime}`;

      // Create an <img> element for the icon
      const iconImg = document.createElement('img');
      iconImg.src = 'assets/img/symboler/sol opogned ikon.png'; // Set the image source

      // Create a <div> element for the 'sunrise' data
      const sunriseDiv = document.getElementById('sunrise');
      sunriseDiv.innerHTML = '';

      // Append the icon and sunrise/sunset text to the 'sunrise' div
      sunriseDiv.appendChild(iconImg); // Add the icon
      sunriseDiv.appendChild(document.createTextNode(sunriseAndSunset)); // Add the combined text
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}


// Check if geolocation is available in the browser
if ("geolocation" in navigator) {
  // Attempt to get the user's geolocation
  navigator.geolocation.getCurrentPosition(
    function (position) {
      // If geolocation is successful, obtain the latitude and longitude
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;

      // Call the getLocation function with the obtained latitude and longitude
      getLocation();

      // Call the getCurrentWeather function with the obtained latitude and longitude
      getCurrentWeather();

      // Call the getTimeTableForNextDays function with the obtained latitude and longitude
      getTimeTableForNextDays();
    },
    function (error) {
      // If the user denies geolocation or there's an error, use default values
      latitude = defaultLatitude;
      longitude = defaultLongitude;

      // Call the getLocation function with the default latitude and longitude
      getLocation();
    }
  );
} else {
  // Geolocation is not available in this browser, use default values
  latitude = defaultLatitude;
  longitude = defaultLongitude;

  // Call the getLocation function with the default latitude and longitude
  getLocation();
}

// Fetch timeTable() ISSUE: 10
function timeTable() {
  const apiKey = '1c8284d2cba51f9f680a3c09e5602ea8';
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }

      return response.json();
    })
    .then((data) => {
      console.log(data);
      // Behandle data og vis det på din startskærm
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// Fetch nextDaysWeather() ISSUE: 11
function nextDaysWeather() {
  const apiKey = '1c8284d2cba51f9f680a3c09e5602ea8';
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }

      return response.json();
    })
    .then((data) => {
      console.log(data);
      // Behandle data og vis det på din startskærm
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}


// Hent dato ISSUE: #39
// Function to get the current date
function getCurrentDate() {
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1; // Month is zero-based
  const year = currentDate.getFullYear();

  const formattedDate = `${day}/${month}/${year}`;
  return formattedDate;
}

// Call the function to get the current date
const currentDate = getCurrentDate();
console.log('Current Date:', currentDate);

// date-view issue #40
const dateElement = document.getElementById('date');
  dateElement.textContent = 'Current Date: ' + currentDate;


// temperature issue #43  
// Function to display temperature data
function displayTemperature(temperature) {
  const tempElement = document.getElementById('temp');
  tempElement.textContent = 'Temperature: ' + temperature + '°C';
}


// Function to get the current temperature
function getCurrentTemperature() {
  const apiKey = '1c8284d2cba51f9f680a3c09e5602ea8'; // Replace with your actual OpenWeatherMap API key
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      // Extract and display the current temperature
      const temperature = data.main.temp;
      displayTemperature(temperature); // Update the 'temp' div with the temperature
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// Function to get the user's location or use default values
function getLocation() {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      // If geolocation is successful, obtain the latitude and longitude
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;

      // Call the getCurrentWeather function with the obtained latitude and longitude
      getCurrentWeather();

      // Call the getCurrentTemperature function with the obtained latitude and longitude
      getCurrentTemperature();
    },
    function (error) {
      // If the user denies geolocation or there's an error, use default values
      latitude = defaultLatitude;
      longitude = defaultLongitude;

      // Call the getCurrentWeather function with the default latitude and longitude
      getCurrentWeather();

      // Call the getCurrentTemperature function with the default latitude and longitude
      getCurrentTemperature();
    }
  );
}

// Call the getLocation function to start the process
getLocation();
//__________________________________
// Function to display weather data in the table
function displayWeatherTable(data) {
  const weatherTable = document.getElementById('weatherTable');
  const tbody = weatherTable.querySelector('tbody');

  // Clear previous data
  tbody.innerHTML = '';

  // Loop through data and create rows in the table
  data.forEach((forecast) => {
    const dateTimeParts = forecast.dt_txt.split(' ')[1].split(':'); // Split time into parts
    const hour = ('0' + dateTimeParts[0]).slice(-2); // Format hour with two digits (e.g., '01')
    const temperature = Math.round(forecast.main.temp); // Round temperature to the nearest whole number
    const windSpeed = forecast.wind.speed.toFixed(1); // Wind speed with one decimal place
    const weatherDescription = forecast.weather[0].description; // Weather description

    // Create a new table row (tr)
    const row = document.createElement('tr');

    // Create cells for each data column
    const timeCell = document.createElement('td');
    timeCell.textContent = hour;
    row.appendChild(timeCell);

    const tempCell = document.createElement('td');
    tempCell.textContent = temperature + '°C'; // Temperature without decimal
    row.appendChild(tempCell);

    const windCell = document.createElement('td');
    windCell.textContent = windSpeed + ' m/s';
    row.appendChild(windCell);

    const weatherCell = document.createElement('td');
    weatherCell.textContent = weatherDescription;
    row.appendChild(weatherCell);

    // Add the row to the table
    tbody.appendChild(row);
  });
}


//_______________________________________________________________________
// Function to get timetable data for the next days
function getTimeTableForNextDays() {
  const apiKey = '1c8284d2cba51f9f680a3c09e5602ea8';
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }

      return response.json();
    })
    .then((data) => {
      // Extract and display the desired data for the next few days
      const forecastList = data.list;

      if (forecastList.length > 0) {
        // Assuming you want the wind information for the first forecast entry
        const firstForecast = forecastList[0];
        const windSpeed = firstForecast.wind.speed;
        const windDirection = degreesToCompass(firstForecast.wind.deg);

        // Update the 'wind' div with the wind information
        updateWind(windSpeed, windDirection);

        // Call the function to display the weather icon based on the weather description
        displayWeatherIconORIGINAL(firstForecast.weather[0].description);

        // Call the function to display the weather table with the forecast data
        displayWeatherTable(forecastList);
      } else {
        console.error('No forecast data found.');
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}


// Function to update the 'wind' div with wind information
function updateWind(speed, direction) {
  const windElement = document.getElementById('wind');
  windElement.textContent = `Wind: ${speed} m/s ${direction}`;
}

// Function to display weather icon based on weather description issue 44__________________________________________________________
function displayWeatherIconORIGINAL(weatherDescription) {
  const weatherIconElement = document.getElementById('vejrtype'); // Assuming you have an HTML element with the id 'vejrtype'
  const iconImg = document.createElement('img');

  let iconSrc;

  // Check if the weather description includes 'rain' in any form
  if (weatherDescription.toLowerCase().includes('rain')) {
    // If 'rain' is found, set the icon to 'regn.png'
    iconSrc = 'assets/img/vejrikoner/regn.png';
  } else if (weatherDescription.toLowerCase().includes('clouds')) {
    if (weatherDescription.toLowerCase().includes('few clouds') || weatherDescription.toLowerCase().includes('broken clouds')) {
      // For "few clouds" or "broken clouds"
      iconSrc = 'assets/img/vejrikoner/letskyet.png';
    } else {
      // For other cloud conditions
      iconSrc = 'assets/img/vejrikoner/skyet.png';
    }
  } else if (weatherDescription.toLowerCase() === 'clear') {
    iconSrc = 'assets/img/vejrikoner/sol.png';
  } else if (weatherDescription.toLowerCase() === 'snow') {
    iconSrc = 'assets/img/vejrikoner/sne.png';
  } else {
    // If the weather description is unknown, display a default icon
    iconSrc = 'assets/img/asshat.png';
  }

  iconImg.src = iconSrc; // Set the image source
  weatherIconElement.innerHTML = ''; // Clear previous content
  weatherIconElement.appendChild(iconImg); // Add the weather icon to the HTML element
}

//__________________________________

// Next few days issue #59

// Function to fetch weather data based on latitude and longitude
async function fetchWeatherData(lat, lon) {
  const apiKey = '1c8284d2cba51f9f680a3c09e5602ea8';
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Weather data not available');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
}

// Function to display weather icon based on weather description
function displayWeatherIcon(weatherDescription, weatherIconElement) {
  const iconImg = document.createElement('img');

  let iconSrc;

  // Check the weather description and set the appropriate icon source
  if (weatherDescription.toLowerCase().includes('clouds')) {
    if (weatherDescription.toLowerCase().includes('few clouds') || weatherDescription.toLowerCase().includes('broken clouds')) {
      // For "few clouds" or "broken clouds"
      iconSrc = 'assets/img/vejrikoner/letskyet.png';
    } else {
      // For other cloud conditions
      iconSrc = 'assets/img/vejrikoner/skyet.png';
    }
  } else if (weatherDescription.toLowerCase() === 'clear') {
    iconSrc = 'assets/img/vejrikoner/sol.png';
  } else if (weatherDescription.toLowerCase() === 'rain') {
    iconSrc = 'assets/img/vejrikoner/regn.png';
  } else if (weatherDescription.toLowerCase() === 'snow') {
    iconSrc = 'assets/img/vejrikoner/sne.png';
  } else {
    // If the weather description is unknown, display a default icon
    iconSrc = 'assets/img/asshat.png';
  }

  iconImg.src = iconSrc; // Set the image source
  weatherIconElement.innerHTML = ''; // Clear previous content
  weatherIconElement.appendChild(iconImg); // Add the weather icon to the HTML element
}
//------------------------
// Function to display weather information for the next seven days one at a time--------------------click on a day and show tableSTART-------------------
async function displayNextDayWeather(dayIndex) {
  const upcomingDaysDiv = document.getElementById('upcomingDays');
  upcomingDaysDiv.innerHTML = ''; // Clear previous content

  let weatherDescription; // Declare weatherDescription in a higher scope

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      const weatherData = await fetchWeatherData(lat, lon);

      if (!weatherData) {
        return;
      }

      if (dayIndex >= 0 && dayIndex < 7) {
        const forecast = weatherData.list[dayIndex];
        weatherDescription = forecast.weather[0].description; // Assign the value here
        const date = new Date(forecast.dt * 1000); // Convert timestamp to date
        const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
        const temperature = forecast.main.temp.toFixed(1); // Temperature in Celsius

        // Create a new element for the day's weather information
        const dayElement = document.createElement('div');

        // Display weather icon using the displayWeatherIcon function
        const weatherIconElement = document.createElement('div');
        displayWeatherIcon(weatherDescription, weatherIconElement);

        // Add a click event listener to the weather icon
        weatherIconElement.addEventListener('click', () => {
          // Call a function to display the weather timetable for that day
          displayWeatherTimetable(dayIndex, weatherData, weatherDescription);
        });

        // Marlene har udkommenteret disse, da da skabte en torsdag for meget? -----------------OBS______________
        //Append the day's weather information and icon to the 'upcomingDays' div 
        // dayElement.innerHTML = `
        //   <p>${dayOfWeek}</p>
        //   <p>${weatherDescription}</p>
        //   <p>${temperature}°C</p>
        // `;-----------------------------------------------------OBS slut________________________________________

        dayElement.appendChild(weatherIconElement);

        upcomingDaysDiv.appendChild(dayElement);
      }
    });
  } else {
    console.error('Geolocation is not available in this browser.');
  }
}

function displayWeatherTimetable(dayIndex, weatherData) {
  // Get the forecast data for the selected day
  const forecast = weatherData.list[dayIndex];

  // Create a new element to display the timetable
  const timetableElement = document.createElement('div');

  // Call the function to populate and display the timetable
  populateWeatherTimetable(timetableElement, forecast);

  // Clear the 'upcomingDays' div and append the timetable
  const upcomingDaysDiv = document.getElementById('upcomingDays');
  upcomingDaysDiv.innerHTML = '';
  upcomingDaysDiv.appendChild(timetableElement);
}
function populateWeatherTimetable(timetableElement, forecast) {
  // Create the table structure
  const weatherTable = document.createElement('table');
  const tableHead = document.createElement('thead');
  const tableBody = document.createElement('tbody');

  // Create table headers
  const tableHeaders = ['Time', 'Temperature', 'Wind Speed', 'Weather Description'];

  const headerRow = document.createElement('tr');
  tableHeaders.forEach((headerText) => {
    const headerCell = document.createElement('th');
    headerCell.textContent = headerText;
    headerRow.appendChild(headerCell);
  });

  tableHead.appendChild(headerRow);
  weatherTable.appendChild(tableHead);

  // Populate the table with weather data
  const forecastList = forecast.list;
  forecastList.forEach((hourlyForecast) => {
    const dateTimeParts = hourlyForecast.dt_txt.split(' ')[1].split(':');
    const hour = ('0' + dateTimeParts[0]).slice(-2);
    const temperature = Math.round(hourlyForecast.main.temp);
    const windSpeed = hourlyForecast.wind.speed.toFixed(1);
    const weatherDescription = hourlyForecast.weather[0].description;

    const row = document.createElement('tr');
    const timeCell = document.createElement('td');
    timeCell.textContent = hour;
    row.appendChild(timeCell);

    const tempCell = document.createElement('td');
    tempCell.textContent = temperature + '°C';
    row.appendChild(tempCell);

    const windCell = document.createElement('td');
    windCell.textContent = windSpeed + ' m/s';
    row.appendChild(windCell);

    const weatherCell = document.createElement('td');
    weatherCell.textContent = weatherDescription;
    row.appendChild(weatherCell);

    tableBody.appendChild(row);
  });

  weatherTable.appendChild(tableBody);
  timetableElement.appendChild(weatherTable);
}

//-----------------------------------------------------------------click on a day and show table sLUT

// Initialize with the first day's weather
let currentDayIndex = 0;
displayNextDayWeather(currentDayIndex);

// Function to display the next day's weather
function showNextDay() {
  if (currentDayIndex < 6) {
    currentDayIndex++;
    displayNextDayWeather(currentDayIndex);
  }
}

// Function to display the previous day's weather
function showPreviousDay() {
  if (currentDayIndex > 0) {
    currentDayIndex--;
    displayNextDayWeather(currentDayIndex);
  }
}

// Function to display weather icon based on weather description___________________________________den der fucker op
function displayWeatherIcon(weatherDescription) {
  let iconSrc;

  // Check the weather description and set the appropriate icon source
 // Check if the weather description includes 'rain' in any form
 if (weatherDescription.toLowerCase().includes('rain')) {
  // If 'rain' is found, set the icon to 'regn.png'
  iconSrc = 'assets/img/vejrikoner/regn.png';
} else if (weatherDescription.toLowerCase().includes('clouds')) {
  if (weatherDescription.toLowerCase().includes('few clouds') || weatherDescription.toLowerCase().includes('broken clouds')) {
    // For "few clouds" or "broken clouds"
    iconSrc = 'assets/img/vejrikoner/letskyet.png';
  } else {
    // For other cloud conditions
    iconSrc = 'assets/img/vejrikoner/skyet.png';
  }
} else if (weatherDescription.toLowerCase() === 'clear') {
  iconSrc = 'assets/img/vejrikoner/sol.png';
} else if (weatherDescription.toLowerCase() === 'snow') {
  iconSrc = 'assets/img/vejrikoner/sne.png';
} else {
  // If the weather description is unknown, display a default icon
  iconSrc = 'assets/img/asshat.png';
}

  // Return the HTML for the weather icon
  return `<img src="${iconSrc}" alt="Weather Icon">`;
}
// Function to display weather information for the next seven days
async function displayUpcomingWeather() {
  const upcomingDaysDiv = document.getElementById('upcomingDays');
  upcomingDaysDiv.innerHTML = ''; // Clear previous content

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      const weatherData = await fetchWeatherData(lat, lon);

      if (!weatherData) {
        return;
      }

      // Initialize an object to track unique days
      const uniqueDays = {};

      // Assuming that weatherData.list contains forecast data for the next seven days
      for (let i = 0; i < weatherData.list.length; i++) {
        const forecast = weatherData.list[i];
        const date = new Date(forecast.dt * 1000); // Convert timestamp to date
        const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });

        // Check if this day has been added to the list already
        if (!uniqueDays[dayOfWeek]) {
          const weatherDescription = forecast.weather[0].description;
          const temperature = forecast.main.temp.toFixed(1); // Temperature in Celsius

          // Create a new element for each day's weather information
          const dayElement = document.createElement('div');

          // Display weather icon using the displayWeatherIcon function
          const weatherIconElement = document.createElement('div');
          weatherIconElement.innerHTML = displayWeatherIcon(weatherDescription);

          // Append the day's weather information and icon to the 'upcomingDays' div
          dayElement.innerHTML = `
            <p>${dayOfWeek}</p>
            <p>${weatherDescription}</p>
            <p>${temperature}°C</p>
          `;

          dayElement.appendChild(weatherIconElement);

          upcomingDaysDiv.appendChild(dayElement);

          // Mark this day as added to the list
          uniqueDays[dayOfWeek] = true;
        }
      }
    });
  } else {
    console.error('Geolocation is not available in this browser.');
  }
}
///_______________testetets

//____________________________

// Call the function to display upcoming weather when the page loads
displayUpcomingWeather();
