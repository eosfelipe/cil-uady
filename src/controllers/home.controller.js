import view from '../views/home.html';
const nosotrosImg = require('../img/home_2.jpg');
const numerosImg = require('../img/numbers.jpg');

const idiomas = require('../img/idiomas.jpg');
const cartas = require('../img/cartas.jpg');
const toefl = require('../img/toefl.jpg');

export default () => {
    const lang = navigator.language;
    const date = new Date();
    const dayNumber = date.getDate();
    const month = date.getMonth();
    const dayName = date.toLocaleString(lang, { weekday: 'long' });
    const monthName = date.toLocaleString(lang, { month: 'long' });
    const year = date.getFullYear();

    const divElement = document.createElement('div');
    divElement.innerHTML = view;

    const imgElement = divElement.querySelector('#nosotros-img');
    imgElement.src = nosotrosImg.default;
    const imgNumbers = divElement.querySelector('#numbers');
    imgNumbers.setAttribute('style', `background: url("${numerosImg.default}") no-repeat center center/cover`);
    const elIdiomas = divElement.querySelector('#idiomas');
    elIdiomas.src = idiomas.default;
    const elPii = divElement.querySelector('#pii');
    elPii.src = cartas.default;
    const elCartas = divElement.querySelector('#cartas');
    elCartas.src = toefl.default;
    divElement.querySelector('#monthName').innerHTML = monthName;
    divElement.querySelector('#dayName').innerHTML = dayName;
    divElement.querySelector('#dayNumber').innerHTML = dayNumber;
    divElement.querySelector('#year').innerHTML = year;

    return divElement;
}