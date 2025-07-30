const apiKey = 'ZNUJFZRED9FAY49RE8ST6A9NS';
const cities = [];
const cards =  [];
let currentIndex = 0;

export async function fetchWeather(city) {
    const searchTerm = city;
    const response = await fetch(`/weather/VisualCrossingWebServices/rest/services/timeline/${searchTerm}/today?unitGroup=us&key=${apiKey}&contentType=json`);
    if (response.ok) {
        const data = await response.json();
        return {
            address: data.resolvedAddress,
            temp: data.currentConditions.temp,
            description: data.currentConditions.conditions,
            today: data.days[0].description,
            precip: data.currentConditions.precipprob
        };
    } else {
        alert('City not found');
    }
}

export async function addCity() {
    const cityInput = document.getElementById('cityInput');
    const cityName = cityInput.value.trim();
    if (cityName && !cities.includes(cityName)) {
        const weather = await fetchWeather(cityName);
        if (weather) {
            cities.push(cityName);
            cards.push(weather);
            currentIndex = cards.length - 1;
            displayWeatherCard(weather);
        }
    }
    cityInput.value = '';
}

function displayWeatherCard({ address, temp, description, today, precip }) {
    const carousel = document.getElementById('weatherCarousel');
    carousel.innerHTML = '';
    const card = document.createElement('div');
    card.className = 'weather-card';
    card.id = 'carousel-item';
    card.innerHTML = 
        `<h3>${address}</h3>
        <h4>Today: ${today}</h4>
        <p>Current Conditions: ${description}</p>
        <p>Current Temperature: ${temp}°F</p>
        <p>Chance of Rain: ${precip}%</p>`;
    carousel.appendChild(card);
    const tracker = document.getElementById('tracker');
    tracker.textContent = `${currentIndex + 1} / ${cities.length}`;

    const buttons = document.createElement('div');
    const refreshButton = document.createElement('button');
    refreshButton.textContent = '🔄';
    refreshButton.onclick = refreshWeatherCard;
    const deleteButton = document.createElement('button');
    deleteButton.textContent = '🗑️';
    deleteButton.onclick = deleteWeatherCard;
    
    buttons.appendChild(refreshButton);
    buttons.appendChild(deleteButton);
    card.appendChild(buttons);
}

export function moveToPrevious() {
    if (cards.length) {
        currentIndex = (currentIndex - 1 + cards.length) % cards.length;
        displayWeatherCard(cards[currentIndex]);
        const tracker = document.getElementById('tracker');
        tracker.textContent = `${currentIndex + 1} / ${cities.length}`
    }
}

export function moveToNext() {
    if(cards.length) {
        currentIndex = (currentIndex + 1) % cards.length;
        displayWeatherCard(cards[currentIndex]);
        const tracker = document.getElementById('tracker');
        tracker.textContent = `${currentIndex + 1} / ${cities.length}`;
    }
}

async function refreshWeatherCard() {
    const weather = await fetchWeather(cities[currentIndex]);
    const card = document.getElementById('carousel-item');
    card.innerHTML = 
    `<h3>${weather.address}</h3>
    <h4>Today: ${weather.today}</h4>
    <p>Current Conditions: ${weather.description}</p>
    <p>Current Temperature: ${weather.temp}°F</p>
    <p>Chance of Rain: ${weather.precip}%</p>`;
    const buttons = document.createElement('div');
    const refreshButton = document.createElement('button');
    refreshButton.textContent = '🔄';
    refreshButton.onclick = refreshWeatherCard;
    const deleteButton = document.createElement('button');
    deleteButton.textContent = '🗑️';
    deleteButton.onclick = deleteWeatherCard;
    
    buttons.appendChild(refreshButton);
    buttons.appendChild(deleteButton);
    card.appendChild(buttons);
}

function deleteWeatherCard() {
    cards.splice(currentIndex, 1);
    cities.splice(currentIndex, 1);
    if (cards.length) {
        moveToPrevious();
    } else {
        currentIndex = 0;
        const carousel = document.getElementById('weatherCarousel');
        carousel.innerHTML = '';
        const tracker = document.getElementById('tracker');
        tracker.textContent = '0 / 0'
    }
}

export function deleteAllCards() {
    cities.splice(0, cities.length);
    cards.splice(0, cards.length);
    const carousel = document.getElementById('weatherCarousel');
    carousel.innerHTML = '';
    const tracker = document.getElementById('tracker');
    tracker.textContent = '0 / 0'
}