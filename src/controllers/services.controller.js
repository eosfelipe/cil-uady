import Api from '../Api';
import view from '../views/services.html';
const idiomas = require('../img/idiomas.jpg');
const cartas = require('../img/cartas.jpg');
const toefl = require('../img/toefl.jpg');

export default async () => {
    const divElement = document.createElement('div');
    divElement.innerHTML = view;

    const response = await Api.getSnapshot("services");
    const data = response.val();

    // const elIdiomas = divElement.querySelector('#idiomas');
    // elIdiomas.src = idiomas.default;
    // const elPii = divElement.querySelector('#pii');
    // elPii.src = cartas.default;
    // const elCartas = divElement.querySelector('#cartas');
    // elCartas.src = toefl.default;

    const columns = divElement.querySelector('.columns');
    const description = divElement.querySelector('#description');

    data.forEach((element, index) => {
        // console.log(element);
        columns.innerHTML += `
        <div class="column is-4">
                    <div class="card">
                        <div class="card-image">
                            <a data-scroll-nav="${index}"><img src="${element.url}"></a>
                        </div>
                        <header class="card-header">
                            <p class="is-size-3 card-header-title heavy" style="color: #1b3041;">
                                ${element.title}
                            </p>
                        </header>
                        <div class="card-content">
                            <div class="content">
                                ${element.text.substring(0, 140)}
                            </div>
                        </div>
                    </div>
                </div>
        `;
        description.innerHTML += `
        <div data-scroll-index="${index}">
                <h1 class="is-size-4 py-1 heavy">${element.title}</h1>
                <p class="textr">${element.text}</p>
            </div>
        `;
    });

    return divElement;
}