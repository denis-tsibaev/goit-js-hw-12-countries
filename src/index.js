// fetch("https://restcountries.eu/rest/v2")
//   .then((response) => {
//     return response.json;
//   })
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((error) => {
//     error;
//   });

const inputCountry = document.querySelector('.input');
inputCountry.addEventListener('input', onSearch)

function onSearch(event) {
	const searchQuery = event.target.value.trim();
}

