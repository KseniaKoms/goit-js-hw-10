const URL = "https://restcountries.com/v3.1";
const options = "?fields=name,capital,population,flags,languages"

export function fetchCountries(name) {
    return fetch(`${URL}/name/${name}${options}`).then(response => {
        if (!response.ok) {
            throw new Error(response.status);
        };
        return response.json();
    }).catch(error => console.log(error))
}
