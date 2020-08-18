import Api from '../Api';
import view from '../views/home.html';
import {
    toast
} from 'bulma-toast';
const nosotrosImg = require('../img/home_2.jpg');
const numerosImg = require('../img/numbers.jpg');

const idiomas = require('../img/idiomas.jpg');
const cartas = require('../img/cartas.jpg');
const toefl = require('../img/toefl.jpg');

export default async () => {
    const lang = navigator.language;

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

    const calendarBox = divElement.querySelector('.box');

    const response = await Api.getSnapshot('events');
    const data = response.val();

    data.sort(compare);

    data.forEach(element => {
        const date = new Date(element.date);
        const dayNumber = date.getDate();
        const month = date.getMonth();
        const dayName = date.toLocaleString(lang, {
            weekday: 'long'
        });
        const monthName = date.toLocaleString(lang, {
            month: 'long'
        });
        const year = date.getFullYear();

        calendarBox.innerHTML += `
        <article class="media">
        <div class="media-left">
            <div class="calendar">
                <p id="monthName">${monthName}</p>
                <p id="dayName">${dayName}</p>
                <p id="dayNumber">${dayNumber}</p>
                <p id="year">${year}</p>
            </div>
        </div>
        <div class="media-content">
            <div class="content">
                <p class="is-size-3">${element.title}</p>
                <p>${element.description}</p>
            </div>
        </div>
        </article>
        `;
    });

    /*  NEWSLETTER SECTION */
    const newsletterForm = divElement.querySelector('#newsletterForm');
    const newsletterInput = divElement.querySelector('#newsletterInput');
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const inputValue = newsletterInput.value.trim();
        const control = newsletterInput.parentElement;
        const small = control.querySelector('.help');
        if (!isEmail(inputValue)) {
            small.style.visibility = 'visible';
            small.innerHTML = 'Ingresa un correo electrónico válido';
        } else {
            small.style.visibility = 'hidden';
            console.log('valid email');
            //fetch to end_point manage newsletter
            toast({
                message: `Correo electrónico registrado 😉`,
                type: "is-warning",
                dismissible: true,
                pauseOnHover: true,
                duration: 3000
            });
            newsletterForm.reset();
        }
    });
    /* END */

    return divElement;
};

function isEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

const compare = (a, b) => {
    const date1 = new Date(a.date);
    const date2 = new Date(b.date);
    let comparison = 0;

    if (date1 > date2) {
        comparison = 1;
    } else if (date1 < date2) {
        comparison = -1;
    }
    return comparison * -1;
}