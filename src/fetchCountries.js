const url = 'https://restcountries.eu/rest/v2/name/';

function fetchCountries(searchQuery) {
  return fetch(`${url}${searchQuery}`)
    .then(res => res.json())
    .catch(console.log);
}

export default fetchCountries;
