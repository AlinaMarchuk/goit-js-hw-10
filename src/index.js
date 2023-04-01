import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './fetchCountries.js';

const DEBOUNCE_DELAY = 300;

const refs = {
  inputEl: document.querySelector('#search-box'),
  countriesList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.inputEl.addEventListener(
  'input',
  debounce(onInputElInput, DEBOUNCE_DELAY)
);

function onInputElInput(e) {
  if (e.target.value.trim()) {
    fetchCountries(e.target.value)
      .then(data => {
        if (data.length > 10) {
          Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
        } else if (data.length >= 2 && data.length <= 10) {
          refs.countriesList.innerHTML = '';
          refs.countryInfo.innerHTML = '';
          refs.countriesList.insertAdjacentHTML('beforeend', listMarkup(data));
        } else if (data.length === 1) {
          refs.countriesList.innerHTML = '';
          refs.countryInfo.innerHTML = cardMarkup(data[0]);
        }
      })
      .catch(error => {
        Notify.failure(error.message);
      });
  } else refs.countriesList.innerHTML = '';
  refs.countryInfo.innerHTML = '';
}

function listMarkup(countries) {
  return countries
    .map(
      country =>
        `<li class="country-item"><img src="${country.flags.svg}"><span class="country-name">${country.name.official}</span></li>`
    )
    .join('');
}

function cardMarkup(country) {
  const { flags, name, capital, population, languages } = country;
  return `<div class="title-wrapper"><img src="${
    flags.svg
  }"><h2 class="country-title">${
    name.official
  }</h2></div><p class="country-info"><span class="info-title">Capital:</span> ${capital}</p><p class="country-info"><span class="info-title">Population:</span> ${population}</p><p class="country-info"><span class="info-title">Languages:</span> ${Object.values(
    languages
  ).join(', ')}</p>`;
}
