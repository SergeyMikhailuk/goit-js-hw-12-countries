import './styles.css';
import './notifications';
import debounce from 'lodash.debounce';
import fetchCountries from './fetchCountries';
import countryHbs from './templates/country.hbs';
import contriesListHbs from './templates/contriesList.hbs';
import { alert, info, error } from '@pnotify/core';

const countriesRef = document.querySelector('.countries-list');
const inputRef = document.querySelector('.input-js');
inputRef.addEventListener('input', debounce(handleInput, 500));

function handleInput() {
  fetchCountries(inputRef.value).then(chooseView);
}

function chooseView(countries) {
  countriesRef.innerHTML = '';

  if (countries.status) {
    error('Error 404, try again');
    return;
  }

  if (countries.length === 1) {
    showCountry(countries);
    info('Country found');
    return;
  }

  if (countries.length > 1 && countries.length < 10) {
    showCountriesList(countries);
    alert(`Found ${countries.length} countries`);
    return;
  }

  if (countries.length >= 10) {
    error('Too many matches found. Please enter a more specific query!');
  }
}

function showCountry(country) {
  const markup = countryHbs(country);
  countriesRef.insertAdjacentHTML('afterbegin', markup);
}

function showCountriesList(countries) {
  const markup = contriesListHbs(countries);
  countriesRef.insertAdjacentHTML('afterbegin', markup);
}

const countriesListRef = document.querySelector('.countries-list');
countriesListRef.addEventListener('click', handleAnchor);

function handleAnchor(event) {
  event.preventDefault();
  const target = event.target;
  if (target.nodeName !== 'A') return;
  fetchCountries(target.textContent).then(chooseView);
}
