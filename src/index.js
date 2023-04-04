import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './fetchCountries.js';
import { listMarkup, cardMarkup } from './markup.js';

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
  const inputValue = e.target.value.trim();
  if (!inputValue) {
    clearContent();
  } else {
    fetchCountries(inputValue)
      .then(data => {
        if (data.length > 10) {
          Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
        } else if (data.length >= 2 && data.length <= 10) {
          clearContent();
          refs.countriesList.insertAdjacentHTML('beforeend', listMarkup(data));
        } else if (data.length === 1) {
          refs.countriesList.innerHTML = '';
          refs.countryInfo.innerHTML = cardMarkup(data[0]);
        }
      })
      .catch(error => {
        Notify.failure(error.message);
      });
  }
}

function clearContent() {
  refs.countriesList.innerHTML = '';
  refs.countryInfo.innerHTML = '';
}
