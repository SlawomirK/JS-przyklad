
$(document).ready(function () {  
    update_stats(); 
    function update_stats() {
        const icon = document.querySelector(".weather");
        const temperature = document.querySelector(".temp p");
        const wind = document.querySelector(".wind p");
        const loc = document.querySelector(".loc p");
        const notyfication = document.querySelector(".notyfication");
        const pressure = document.querySelector(".pressure p")
        $(".notyfication").hide();

        const weather = {};

        if ('geolocation' in navigator) {
            navigator.geolocation.watchPosition(setPosition, showError);

        } else {
            $(".notyfication").show();

        }


        function setPosition(position) {
            let lat = null;
            let lon = null;
            try {
                lat = position.coords.latitude;
                lon = position.coords.longitude;
                weatherFunction(lat, lon);
                console.log("lat" + lat);
            }
            catch (er) {
                showEr("POSITION_UNAVAILABLE");
                console.log("er" + er);
            }
        }
        function weatherFunction(currentLat, currentLon) {
            const APIkey = "d7c42532f4abc937c0a681b46d08657a";
            const getURL = "https://api.openweathermap.org/data/2.5/weather?lat=" + currentLat + "&lon=" + currentLon + "&units=metric&APPID=" + APIkey;
            $.ajax({
                url: getURL,
                dataType: "json"
            }).done(function (response) {
                show(response);

            }).fail(function () {
                showEr("POSITION_UNAVAILABLE");
                $(".notyfication").show();
            });

        };

        function showEr(er) {
            console.log(er);
            notyfication.innerHTML = "<p>" + er + "</p>";
            $(".notyfication").show();
        }
        function showError(error) {
            notyfication.innerHTML = `<p>${error.message}</p>`;
            $(".notyfication").show();

        }
        function show(data) {
            icon.innerHTML = `<img src="weather-icons/${data.weather[0].icon}.png"/>`;
            temperature.innerHTML = `${data.main.temp}&deg;C`;
            // description.innerHTML = data.weather.description;
            loc.innerHTML = ` ${data.name}, ${data.sys.country}`;
            wind.innerHTML = change_windSpeed(`${data.wind.speed}`) + " km/h";
            pressure.innerHTML = `${data.main.pressure} hPa`;

        }
        function change_windSpeed(ms) {
            //1m/s=3,6km/h
            return Math.floor(ms * 3.6);
        }
        
    }
    /*
    const time = setTimeout(function () {
        (update_stats())}, 10000);
*/
});


