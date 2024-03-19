import _ from 'lodash';
import './style.css';

updateCurrent('minneapolis');
init();

 function init() {
    const changeBtn = document.querySelector('#btnLoc');
    changeBtn.addEventListener('click', function(){
        const currentLocation = document.querySelector('#locIn').value;
        updateCurrent(currentLocation);
    });
 }

 async function fetchWeather(location) {
    try{
        const url = 'http://api.weatherapi.com/v1/forecast.json?key=af3436b6fe1c473abcb31303241803&q='+location+'&days=3&aqi=no&alerts=no'
        const response = await fetch(url, {mode: 'cors'});
        const data = await response.json();
        console.log(data);
        console.log('current: '+ data.current.condition.text);
        return data;
    } catch(error) {

    }
 }

 function updateCurrent(location){
    fetchWeather(location).then(c => updateDisplay(c));
 }

function updateDisplay(data){
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

    const title = createInfoElement('div', date);
    const condition = createInfoElement('div', day.condition.text);
    const minTemp = createInfoElement('Min Temp',`${day.mintemp_f}°F`);
    const maxTemp = createInfoElement('Max Temp', `${day.maxtemp_f}°F`);
    const avgTemp = createInfoElement('Avg. Temp', `${day.avgtemp_f}°F`);
    const precip = createInfoElement('Total Precipitation', `${day.totalprecip_in} in.`);
    const chancerain = createInfoElement('Chance of Rain', `${day.daily_chance_of_rain}%`);
    const chancesnow = createInfoElement('Chance of Snow', `${day.daily_chance_of_snow}%`);
    const sunrise = createInfoElement('Sunrise', astro.sunrise);
    const sunset = createInfoElement('Sunset', astro.sunset);

    container.appendChild(title);
    container.appendChild(icon);
    container.appendChild(condition);
    container.appendChild(minTemp);
    container.appendChild(avgTemp);
    container.appendChild(maxTemp);
    container.appendChild(precip);
    container.appendChild(chancerain);
    container.appendChild(chancesnow);
    container.appendChild(sunrise);
    container.appendChild(sunset);
    return container;
}

function currentDisplay(current) {
    const main = document.createElement('div');
    main.id = 'currentCont';

    const title = document.createElement('h2');
    title.textContent = `${current.location.name}, ${current.location.region}`;

    const cur = document.createElement('div');
    cur.id = 'currweather';

    const icon = document.createElement('img');
    icon.src = `http://${current.current.condition.icon}`;

    cur.textContent = current.current.condition.text;

    const temp = createInfoElement('Temperature', `${current.current.temp_f}°F`, 'currtemp');
    const feels = createInfoElement('Feels like', `${current.current.feelslike_f}°F`);
    const humid = createInfoElement('Humidity', `${current.current.humidity}%`);
    const precip = createInfoElement('Precipitation', `${current.current.precip_in} in.`);
    const wind = createInfoElement('Wind speed', `${current.current.wind_mph} mph`);
    const lastUp = createInfoElement('Last updated', current.current.last_updated);

    main.appendChild(title);
    main.appendChild(icon);
    main.appendChild(cur);
    main.appendChild(temp);
    main.appendChild(feels);
    main.appendChild(humid);
    main.appendChild(precip);
    main.appendChild(wind);
    main.appendChild(lastUp);

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

 
 
