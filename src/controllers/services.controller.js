import view from '../views/services.html';
const idiomas = require('../img/idiomas.jpg');
const cartas = require('../img/cartas.jpg');
const toefl = require('../img/toefl.jpg');

export default () => {
    const divElement = document.createElement('div');
    divElement.innerHTML = view;

    const elIdiomas = divElement.querySelector('#idiomas');
    elIdiomas.src = idiomas.default;
    const elPii = divElement.querySelector('#pii');
    elPii.src = cartas.default;
    const elCartas = divElement.querySelector('#cartas');
    elCartas.src = toefl.default;

    return divElement
}