import { error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import debounce from 'lodash.debounce';
import fetchCountry from './js/fetchCountries';
import './sass/main.scss';
import countryListTmpl from './templates/countryListTmpl.hbs';
import countryTmpl from './templates/countryTmpl.hbs';

const refs = {
  cardContainer: document.querySelector('.js-card-container'),
  searchInput: document.querySelector('.js-input'),
};

refs.searchInput.addEventListener('input', debounce(onSearch, 1000));

function onSearch(event) {
  const searchQuery = event.target.value.trim();
  fetchCountry(searchQuery).then(renderCountry).catch(onFetchError);  
}

function renderCountry(countryToRender) {
  let markup = '';

  if (countryToRender.length > 10) {
    error({
      title: 'ATTENTION!',
      text: 'необходимо сделать запрос более специфичным',
    });
  }

  if (countryToRender.length === 1) {
    markup = countryTmpl(...countryToRender);
	// Очищаем инпут после рендера карточки страны
	refs.searchInput.value='';
  }

  if (countryToRender.length > 1 && countryToRender.length <= 10) {
    markup = countryListTmpl(countryToRender);
  }

  refs.cardContainer.innerHTML = markup;
  
}

function onFetchError() {
	alert('something wrong! maybe name?');
  }
