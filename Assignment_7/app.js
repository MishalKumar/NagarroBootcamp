const city = document.querySelector(".city");

const getData = document.querySelector(".getdata");

const apiKey = "b3d536c9020a0002d9191e97f45764ba";

//event listener for inputCity
city.addEventListener("keypress", function ( e ) {

    if (e.key === 'Enter') {

        // retrieve the data from input box
        const cityName = city.value;
        if (cityName !== "") {
            
            // Fetch the data through API
        
            const queryString = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&cnt=16&units=metric`;
            fetch(queryString)
            .then(fetchedData => {
                return fetchedData.json();
            })
            .then(fetchedJson => {
                const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                var today  = new Date();
                // Get data 
                getData.innerHTML = `
                <ul>
                    <!-- City Name and Country Name -->
                    <li class="city-country-name"> <span>${fetchedJson.name}</span>, <span>${fetchedJson.sys.country}</span></li>
                    <!-- Date -->
                    <li class="current-date">${today.toLocaleDateString("en-US", options)}</li>
                    <!-- Temperature -->
                    <li class="current-temp"><span>${fetchedJson.main.temp}°c</span></li>
                    <!-- Type of weather (Haze, sunny etc) -->
                    <li class="weather-type">${fetchedJson.weather[0].description}</span></li>
                    <!-- Max/Min temperature -->
                    <li class="min-max-temp"><span>${fetchedJson.main.temp_min}°c</span> / <span>${fetchedJson.main.temp_max}°c</span></li>
                </ul>
                `
            }).catch(err => console.log(err));
            console.log(cityName);
        }

        // Clear the search box
        city.value = "";
    }
})