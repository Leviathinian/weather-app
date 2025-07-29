const apiKey = 'ZNUJFZRED9FAY49RE8ST6A9NS';
const cities = [];
const cards =  [];
let currentIndex = 0;

export async function fetchWeather(city) {
    // fetch('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${searchTerm}/today?unitGroup=us&include=days&key=${apiKey}&contentType=json', {mode: 'cors'})
    // .then(response => response.json())
    // .then(data => {
    //     //Add to Weather Carousel
    //     console.log(data);
    // })
    const searchTerm = city;
    const response = await fetch(`/weather/VisualCrossingWebServices/rest/services/timeline/${searchTerm}/today?unitGroup=us&key=${apiKey}&contentType=json`);
    if (response.ok) {
        const data = await response.json();
        return {
            address: data.resolvedAddress,
            temp: data.currentConditions.temp,
            description: data.description
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
            console.log(weather);
            displayWeatherCard(weather);
            currentIndex = cards.length - 1;
        }
    }
    cityInput.value = '';
}

function displayWeatherCard({ address, temp, description }) {
    const carousel = document.getElementById('weatherCarousel');
    carousel.innerHTML = '';
    const card = document.createElement('div');
    card.className = 'weather-card';
    card.id = 'carousel-item';
    card.innerHTML = 
        `<h3>${address}</h3>
        <p>${temp}°F</p>
        <p>${description}</p>`;
    carousel.appendChild(card);
}

function addCard({ address, temp, description }) {
    cards.push({ address, temp, description });
}

export function moveToPrevious() {
    if (cards.length) {
        currentIndex = (currentIndex - 1 + cards.length) % cards.length;
        displayWeatherCard(cards[currentIndex]);
        console.log(cards);
        console.log(currentIndex);
    }
}

export function moveToNext() {
    if(cards.length) {
        currentIndex = (currentIndex + 1) % cards.length;
        displayWeatherCard(cards[currentIndex]);
        console.log(cards);
        console.log(currentIndex);
    }
}
