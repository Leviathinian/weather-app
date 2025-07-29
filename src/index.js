import './styles.css';
import { greet } from './modules/greet.js';
import { capitalize } from './modules/utils.js';
import { fetchWeather } from './modules/weatherapi.js'
import { addCity, moveToNext, moveToPrevious } from './modules/weatherapi.js';


function createUI() {
    const root = document.body;

    const title = document.createElement('h1');
    title.textContent = 'Weather App';

    const input = document.createElement('input');
    input.id = 'cityInput';
    input.classList.add('cityInput');
    input.placeholder = 'Enter address... (e.g. New York City, NY)';

    const button = document.createElement('button');
    button.textContent = 'Add City';
    button.onclick = addCity;

    const carousel = document.createElement('div');
    carousel.id = 'weatherCarousel';
    carousel.className = 'carousel';

    const navButtons = document.createElement('div');

    const prevWeatherBtn = document.createElement('button');
    prevWeatherBtn.id = 'prevWeatherBtn';
    prevWeatherBtn.onclick = moveToPrevious;
    prevWeatherBtn.textContent = "⬅️"

    const nextWeatherBtn = document.createElement('button');
    nextWeatherBtn.id = 'prevWeatherBtn';
    nextWeatherBtn.onclick = moveToNext;
    nextWeatherBtn.textContent = "➡️";

    navButtons.appendChild(prevWeatherBtn);
    navButtons.appendChild(nextWeatherBtn);

    root.appendChild(title);
    root.appendChild(input);
    root.appendChild(button);
    root.appendChild(carousel);
    root.appendChild(navButtons);
}

const name = 'user';
const message = greet(capitalize(name));
document.getElementById('app').textContent = message;
// console.log(fetchWeather(encodeURIComponent('New York City')));
createUI();