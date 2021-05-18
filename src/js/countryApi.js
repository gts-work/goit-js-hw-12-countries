const BASE_URL = "https://restcountries.eu/rest/v2/name";

export default class CountryApiService {
    constructor() {
        this.countryName = "";
    }

    fetchCountrys() {
        const url = `${BASE_URL}/${this.countryName}`;
        return fetch(url).then((response) => response.json());
    }

    get name() {
        return this.countryName;
    }

    set name(newName) {
        this.countryName = newName;
    }
}
