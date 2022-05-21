import './css/styles.css';
import debounce from "lodash.debounce";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries }  from './js/fetchCountries';

const DEBOUNCE_DELAY = 300;

const refs = {
    input: document.querySelector('#search-box'),
    list: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', debounce(onInputChange, DEBOUNCE_DELAY));

function onInputChange(e) {
    const countryName = e.target.value.trim();
    if (countryName === '') {
        refs.countryInfo.innerHTML = '';
        refs.list.innerHTML = '';
        return;
    };
    fetchCountries(countryName).then(renderMarkup).catch(error => errorNotification());
}

function renderMarkup(countries) {
    if (countries.length > 10) {
        warningNotification();
    } else if (countries.length >= 2 && countries.length <= 10) {
        refs.countryInfo.innerHTML = '';
        showCountryList(countries);
    } else if (countries.length === 1) {
        refs.list.innerHTML = '';
        showCountryCard(countries);
    }
};

function showCountryList(countries) {
    const listItem = countries.map(country => `<li><img src="${country.flags.svg}" alt="${country.name.common}" width="30"/> ${country.name.common}</li>`).join('');
        refs.list.innerHTML = listItem;
};

function warningNotification() {
    Notify.info("Too many matches found. Please enter a more specific name.");
};

function errorNotification() {
    Notify.failure("Oops, there is no country with that name");
    refs.list.innerHTML = '';
    refs.countryInfo.innerHTML = '';
}
function showCountryCard(countryArray) {
    const cardItem = countryArray.map(country => `<img src="${country.flags.svg}" alt="${country.name.common}" width="30"/>
    <p>${country.name.common}</p>
    <ul>
    <li>Capital: ${country.capital}</li>
    <li>Population: ${country.population}</li>
    <li>Languages: ${Object.values(country.languages)}</li>
    </ul>`).join('');
    refs.countryInfo.innerHTML = cardItem;
};