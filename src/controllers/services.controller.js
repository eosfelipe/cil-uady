import view from '../views/services.html';

export default () => {
    const divElement = document.createElement('div');
    divElement.innerHTML = view;

    return divElement
}