import Api from '../Api';
import view from '../views/calls.html';

export default async () => {
  const divElement = document.createElement('div');
  divElement.innerHTML = view;

  const response = await Api.getSnapshot("calls");
  const data = response.val();

  const list = divElement.querySelector('.menu-list');

  data.sort(compare);

  data.forEach(element => {
    list.innerHTML += `
    <li>
      <span class="tag is-primary">${element.date}</span>
      <a class="has-text-primary is-link is-size-4 card-header-title"
        href="${element.url}" target="_blank">${element.title} <i class="fas fa-external-link-alt"></i></a>
      <div class="notification is-warning is-light">${element.text}</div>
    </li>
    `;
  });

  return divElement;
};

const compare = (a, b) => {
  const date1 = new Date(a.date);
  const date2 = new Date(b.date);
  let comparison = 0;

  if(date1 > date2) {
    comparison = 1;
  } else if(date1 < date2) {
    comparison = -1;
  }
  return comparison * -1;
}