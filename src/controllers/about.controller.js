import Api from "../Api";
import view from "../views/about.html";

export default async () => {
  const divElement = document.createElement("div");
  divElement.innerHTML = view;

  const response = await Api.getSnapshot("about");
  const data = response.val();

  const row1 = divElement.querySelector("#about .rowE1");
  const row2 = divElement.querySelector("#about .rowE2");
  const row3 = divElement.querySelector("#about .rowE3");

  row1.innerHTML = `
        <div class="column is-6">
            <h1 class="title has-text-warning">${data[0].title}</h1>
            <p class="textr">${data[0].text}</p>
        </div>
        <div class="column is-6">
            <img class="image" src="${data[0].url}" alt="${data[0].title}">
        </div>`;
  row2.innerHTML = `
        <div class="column is-6">
            <img class="image" src="${data[1].url}" alt="${data[1].title}">
        </div>
        <div class="column is-6">
            <h1 class="title has-text-warning">${data[1].title}</h1>
            <p class="textr">${data[1].text}</p>
        </div>`;
  row3.innerHTML = `
        <div class="column is-6">
            <h1 class="title has-text-warning">${data[2].title}</h1>
            <p class="textr">${data[2].text}</p>
        </div>
        <div class="column is-6">
            <img class="image" src="${data[2].url}" alt="${data[2].title}">
        </div>`;

  return divElement;
};
