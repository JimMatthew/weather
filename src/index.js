import _ from 'lodash';
import './style.css';

updateWeather('minneapolis');
init();

 function init() {
    document.querySelector('#btnLoc').addEventListener('click', function(){
        updateWeather(document.querySelector('#locIn').value);
    });
 }

 async function fetchWeather(location) {
    try{
        const url = 'http://api.weatherapi.com/v1/forecast.json?key=af3436b6fe1c473abcb31303241803&q='+location+'&days=3&aqi=no&alerts=no'
        const response = await fetch(url, {mode: 'cors'});
        const data = await response.json();
        return data;
    } catch(error) {

    }
 }

 function updateWeather(location) {
    fetchWeather(location).then(c => updateDisplay(c));
 }

function updateDisplay(data) {
    const main = document.querySelector('#main');
    main.innerHTML = '';
    main.appendChild(currentDisplay(data));
    data.forecast.forecastday.forEach(function(day) {
        main.appendChild(futureForcast(day));
    })
}

function futureForcast(forecast) {
    const { astro, date, day } = forecast;
    
    const container = document.createElement('div');
    container.classList.add('forecastCont');

    const icon = document.createElement('img');
    icon.src = `http://${day.condition.icon}`;

    container.appendChild(createInfoElement('', date));
    container.appendChild(icon);
    container.appendChild(createInfoElement('', day.condition.text));
    container.appendChild(createInfoElement('Min Temp',`${day.mintemp_f}°F`));
    container.appendChild(createInfoElement('Avg. Temp', `${day.avgtemp_f}°F`));
    container.appendChild(createInfoElement('Max Temp', `${day.maxtemp_f}°F`));
    container.appendChild(createInfoElement('Total Precipitation', `${day.totalprecip_in} in.`));
    container.appendChild(createInfoElement('Chance of Rain', `${day.daily_chance_of_rain}%`));
    container.appendChild(createInfoElement('Chance of Snow', `${day.daily_chance_of_snow}%`));
    container.appendChild(createInfoElement('Sunrise', astro.sunrise));
    container.appendChild(createInfoElement('Sunset', astro.sunset));
    return container;
}

function currentDisplay(current) {
    const main = document.createElement('div');
    main.id = 'currentCont';

    const title = document.createElement('h2');
    title.textContent = `${current.location.name}, ${current.location.region}`;

    const cur = document.createElement('div');
    cur.id = 'currweather';
    cur.textContent = current.current.condition.text;

    const icon = document.createElement('img');
    icon.src = `http://${current.current.condition.icon}`;

    main.appendChild(title);
    main.appendChild(icon);
    main.appendChild(cur);
    main.appendChild(createInfoElement('Temperature', `${current.current.temp_f}°F`, 'currtemp'));
    main.appendChild(createInfoElement('Feels like', `${current.current.feelslike_f}°F`));
    main.appendChild(createInfoElement('Humidity', `${current.current.humidity}%`));
    main.appendChild(createInfoElement('Precipitation', `${current.current.precip_in} in.`));
    main.appendChild(createInfoElement('Wind speed', `${current.current.wind_mph} mph`));
    main.appendChild(createInfoElement('Last updated', current.current.last_updated));
    return main;
}

function createInfoElement(label, value, id = null) {
    const element = document.createElement('div');
    if (id) {
        element.id = id;
    }
    element.textContent = `${label}: ${value}`;
    return element;
}

 
 
