import './sass/main.scss';
import countryTmpl from './templates/countryTmpl.hbs';
import countryListTml from './templates/countryTmpl.hbs';
import debounce from 'lodash.debounce';
import { error } from '@pnotify/core';

const refs = {
  cardContainer: document.querySelector('.js-card-container'),
  searchInput: document.querySelector('.js-input'),
  countrySearchResult: document.querySelector('.country-list'),
};

refs.searchInput.addEventListener('input', debounce(onSearch, 500));

function onSearch(event) {
  const searchQuery = event.target.value;
  fetchCountry(searchQuery).then(renderCountry).catch(onFetchError);
  console.log(fetchCountry(searchQuery).then(renderCountry).catch(onFetchError));
}

function fetchCountry(countryName) {
  const url = `https://restcountries.eu/rest/v2/name/${countryName}`;
  return fetch(url).then(response => {
    return response.json();
  });
}

function renderCountry(countryToRender) {
  const markup = countryTmpl(countryToRender);
  refs.cardContainer.innerHTML = markup;
//   console.log(markup)
}

function onFetchError() {
  alert('something wrong! maybe name?');
}
