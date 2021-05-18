import "./styles.css";
import "@pnotify/core/dist/PNotify.css";
import { error } from "@pnotify/core";
import "@pnotify/core/dist/BrightTheme.css";

import { refs } from "./js/refs";
import CountryApiService from "./js/countryApi";
import countryListTpl from "./templates/countrys-list.hbs";
import countryItemTpl from "./templates/countrys-item.hbs";

var debounce = require("lodash.debounce");

const inputButton = refs.inputBtn;
const countryApiService = new CountryApiService();

inputButton.addEventListener("input", debounce(onInputSearch, 500));

function onInputSearch(e) {
    const countryQuery = e.target.value;
    countryApiService.name = countryQuery;

    countryApiService.fetchCountrys().then((countrys) => {
        const countrysLength = countrys.length;

        if (countrys.status === 404) {
            const title = "Oops!";
            const text = "Invalid query.";
            showErrorMessage(title, text);
        } else if (countrysLength > 10) {
            const title = "Oops!";
            const text = "To many matches found. Enter a more specific query.";
            const notice = showErrorMessage(title, text);
        } else if (countrysLength == 1) {
            appendItemCountryMarkup(countrys);
        } else {
            appendListCountrysMarkup(countrys.map((country) => country.name));
        }
    });
}

function appendItemCountryMarkup(countrys) {
    refs.container.innerHTML = "";
    refs.container.insertAdjacentHTML("beforeend", countryItemTpl(countrys));
}

function appendListCountrysMarkup(countryNames) {
    refs.container.innerHTML = "";
    refs.container.insertAdjacentHTML(
        "beforeend",
        countryListTpl(countryNames)
    );
}

function showErrorMessage(title, text) {
    error({
        title: title,
        text: text,
    });
}
