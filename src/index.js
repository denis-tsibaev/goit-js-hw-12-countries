import './sass/main.scss';
import countryTmpl from './templates/countryTmpl.hbs';
import countryListTml from './templates/countryTmpl.hbs';
import debounce from 'lodash.debounce';
import { error } from '@pnotify/core';

const refs = {
  cardContainer: document.querySelector('.js-card-container'),
  searchInput: document.querySelector('.input'),
  countrySearchResult:  document.querySelector('.country-list'),
};

refs.searchInput.addEventListener('input', debounce(onSearch, 500));

function onSearch(event) {
  event.preventDefault();

//   const inputTarget = event.currentTarget;
  const searchQuery = event.target.value;

  if (searchQuery.length > 0) {
    fetchCountry(searchQuery).then(renderCountryCard).catch(onFetchError)
	// .finally(() => (refs.countrySearchResult.innerHTML = ''));
}
}
  

function renderCountryCard(resolvedCountries){
	let markup ='';

	if (resolvedCountries.length>10) {
		error ({
			title: false,
            text: 'необходимо сделать запрос более специфичным',
            sticker: false,
            maxTextHeight: null,
            closerHover: false,
            animation: 'fade',
            mouseReset: false,
            delay: 5000,
		});

		if (resolvedCountries.length===1) {
			markup = countryTmpl(...resolvedCountries)
		}

		if (resolvedCountries.length>1&&resolvedCountries.length<=10) {
			markup = countryListTml(resolvedCountries)
		}
	}
	refs.countrySearchResult.innerHTML = markup
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
