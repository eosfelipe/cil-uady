import view from '../views/calls.html';

export default () => {
  const divElement = document.createElement('div');
  divElement.innerHTML = view;

  return divElement;
}