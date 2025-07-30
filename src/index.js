import './styles.css';
import { addCity, moveToNext, moveToPrevious, deleteAllCards } from './modules/weatherapi.js';


function createUI() {
    const root = document.body;
    root.classList.add('light');

    const settings = document.createElement('div');
    settings.className = 'dropdown';
    const settingsButton = document.createElement('button');
    settingsButton.textContent = '⚙️';
    settingsButton.onclick = settingsDropdown;
    const darkModeToggleButton = document.createElement('button');
    darkModeToggleButton.textContent = 'Toggle Light/Dark Mode';
    darkModeToggleButton.id = 'darkModeToggle';
    darkModeToggleButton.onclick = darkModeToggle;
    darkModeToggleButton.style.display = 'none';
    const clearButton = document.createElement('button');
    clearButton.textContent = 'Clear All Weather Cards';
    clearButton.id = 'clear';
    clearButton.onclick = deleteAllCards;
    clearButton.style.display = 'none';

    settings.appendChild(settingsButton);
    settings.appendChild(darkModeToggleButton);
    settings.appendChild(clearButton);

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
    navButtons.className = 'navButtons';

    const prevWeatherBtn = document.createElement('button');
    prevWeatherBtn.id = 'prevWeatherBtn';
    prevWeatherBtn.onclick = moveToPrevious;
    prevWeatherBtn.textContent = "⬅️"

    const tracker = document.createElement('p');
    tracker.id = 'tracker';
    tracker.textContent = "0 / 0";

    const nextWeatherBtn = document.createElement('button');
    nextWeatherBtn.id = 'prevWeatherBtn';
    nextWeatherBtn.onclick = moveToNext;
    nextWeatherBtn.textContent = "➡️";

    navButtons.appendChild(prevWeatherBtn);
    navButtons.appendChild(tracker);
    navButtons.appendChild(nextWeatherBtn);

    root.appendChild(settings);
    root.appendChild(title);
    root.appendChild(input);
    root.appendChild(button);
    root.appendChild(carousel);
    root.appendChild(navButtons);
}

let darkMode = 0;
let dropdownVisible = 0;

function settingsDropdown() {
    const darkMode = document.getElementById('darkModeToggle');
    const clear = document.getElementById('clear');
    if (dropdownVisible) {
        darkMode.style.display = 'none';
        clear.style.display = 'none';
        dropdownVisible = 0;
    } else {
        darkMode.style.display = 'block';
        clear.style.display = 'block';
        dropdownVisible = 1;
    }
}

function darkModeToggle() {
    const root = document.body;
    if (darkMode) {
        root.classList.remove('dark');
        root.classList.add('light');
        darkMode = 0;
    } else {
        root.classList.remove('light');
        root.classList.add('dark');
        darkMode = 1;
    }
}

createUI();