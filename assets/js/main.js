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
      console.log('Temperature:', temperature, 'C'); // Temperature in Celcels
      console.log('Wind Speed:', windSpeed, 'm/s');
      console.log('Wind Speed (Beaufort):', beaufortScale);
      console.log('Wind Direction:', compassDirection);
      console.log('Sunrise:', sunriseTime);
      console.log('Sunset:', sunsetTime);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}



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
      console.log(data);
      // Behandle data og vis det på din startskærm
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

function updateWeatherInfo(dateTime, temperature, windSpeed, compassDirection, beaufortScale) {
  const weatherinfo = document.getElementById('weatherinfo');
  const weatherDiv = document.createElement('div');

  weatherDiv.innerHTML = `
    <p>Date and Time: ${dateTime}</p>
    <p>Temperature: ${temperature}</p>
    <p>Wind Speed: ${windSpeed}</p>
    <p>Wind Direction: ${compassDirection}</p>
    <p>Wind Speed (Beaufort): ${beaufortScale}</p>
  `
  weatherinfo.appendChild(weatherDiv);
}

//  træk data fra getTimeTableForNextDays() ISSUE: 31
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
        // Loop through the forecast data
        forecastList.forEach((forecast) => {
          const dateTime = forecast.dt_txt; // Date and time
          const temperature = forecast.main.temp; // Temperature in Celsius
          const windSpeed = forecast.wind.speed; // Wind speed in m/s
          const windDirection = forecast.wind.deg; // Wind direction in degrees

          // Use the functions to convert wind direction to compass direction and wind speed to Beaufort scale
          const compassDirection = degreesToCompass(windDirection);
          const beaufortScale = windSpeedToBeaufort(windSpeed);

          updateWeatherInfo(dateTime, temperature, windSpeed, compassDirection, beaufortScale);

          // Log or process the extracted data as needed
          console.log('Date and Time:', dateTime);
          console.log('Temperature:', temperature, 'C');
          console.log('Wind Speed:', windSpeed, 'm/s');
          console.log('Wind Direction:', compassDirection);
          console.log('Wind Speed (Beaufort):', beaufortScale);
        });
      } else {
        console.error('No forecast data found.');
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
