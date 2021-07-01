export default function fetchCountry(countryName) {
  const url = `https://restcountries.eu/rest/v2/name/${countryName}`;
  return fetch(url).then(response => {
    return response.json();
  });
}
