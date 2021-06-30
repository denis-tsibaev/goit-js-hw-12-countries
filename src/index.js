import './sass/main.scss';
import countryTmpl from './templates/countryTmpl.hbs';
import countryListTml from './templates/countryTmpl.hbs';
import debounce from 'lodash.debounce';
import { error } from '@pnotify/core';

const refs = {
  cardContainer: document.querySelector('.js-card-container'),
  searchInput: document.querySelector('.input'),
  countrySearchResult: document.querySelector('.country-list'),
};

refs.searchInput.addEventListener('input', debounce(onSearch, 500));

function onSearch(event) {
//   event.preventDefault();
  //   const inputTarget = event.currentTarget;

  const searchQuery = event.target.value;

  if (searchQuery) {
    fetchCountry(searchQuery).then(renderCountryCard).catch(onFetchError);
    // .finally(() => (searchQuery = ''));
  }
}

function renderCountryCard(resolvedCountries) {
  let markup = '';

  if (resolvedCountries.length > 10) {
    error({
      text: 'необходимо сделать запрос более специфичным',
    });

    if (resolvedCountries.length === 1) {
      markup = countryTmpl(resolvedCountries);
    }

    if (resolvedCountries.length > 1 && resolvedCountries.length <= 10) {
      markup = countryListTml(...resolvedCountries);
    }
  }
  refs.countrySearchResult.innerHTML = markup;
}

function fetchCountry(countryName) {
  const url = `https://restcountries.eu/rest/v2/name/${countryName}`;
  return fetch(url).then(response => {
    return response.json();
  });
}

function renderCountryCard(country) {
  const markup = countryTmpl(country);
  refs.cardContainer.innerHTML = markup;
}

function onFetchError() {
  alert('something wrong! maybe name?');
}
