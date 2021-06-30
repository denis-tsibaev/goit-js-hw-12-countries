import countryTmpl from './templates/countryTmpl.hbs';

const refs = {
	cardContainer: document.querySelector('.js-card-container'),
}


fetch("https://restcountries.eu/rest/v2")
  .then((response) => {
    return response.json;
  })
  .then((data) => {
    console.log(data);
	const markup = countryTmpl(data);
	refs.cardContainer.innerHTML = markup;
  })
  .catch((error) => {
    console.log(error);
  });

const inputCountry = document.querySelector('.input');
inputCountry.addEventListener('input', onSearch)

function onSearch(event) {
	const searchQuery = event.target.value.trim();
}

