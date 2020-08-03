import Api from '../Api';
import view from '../views/about.html';

export default async () => {
    const divElement = document.createElement('div');
    divElement.innerHTML = view;

    const response = await Api.getSnapshot('about');
    const data = response.val();

    const divColumns = divElement.querySelectorAll('#about .rowE');
    divColumns.forEach((item, index) => {
        item.innerHTML = `
        <div class="column is-6">
            <h1 class="title has-text-warning">${data[index].title}</h1>
            <p class="textr">${data[index].text}</p>
        </div>
        <div class="column is-6">
            <img class="image" src="${data[index].url}">
        </div>`;
    });

    return divElement;
}