import Api from '../Api';
import { toast } from 'bulma-toast';
import view from '../views/contact.html';
let name = null;
let email = null;
let subject = null;
let message = null;
let error = null;

export default async () => {
    const divElement = document.createElement('div');
    divElement.innerHTML = view;

    /* CONTACT SECTION */
    const contactForm = divElement.querySelector('#contactForm');
    name = divElement.querySelector('#name');
    email = divElement.querySelector('#email');
    subject = divElement.querySelector('#subject');
    message = divElement.querySelector('#message');
    error = null;

    const inputs = divElement.querySelectorAll('#contactForm input');
    inputs.forEach(input => {
        input.addEventListener('blur', checkInputs);
    });
    const button = divElement.querySelector('.button');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        checkInputs();
        // console.log(error);
        const formData = new FormData(e.target);
        const name = formData.get('name');
        if (!error) {
            const dt = new Date().toJSON().slice(0, 19).replace('T', ' ');
            let queryString = new URLSearchParams(formData).toString();
            queryString += `&date_time=${dt}`;
            Api.END_POINT_CONTACT += queryString;
            button.classList.remove('is-primary');
            button.classList.add('is-loading');

            fetch(Api.END_POINT_CONTACT)
                .then(response => response.json())
                .catch(error => console.error('Error:', error))
                .then(json => {
                    if (json.result === 'success') {
                        toast({
                            message: `Gracias por escribirnos ${name}`,
                            type: "is-warning",
                            dismissible: true,
                            pauseOnHover: true,
                            duration: 3000
                        });
                        button.classList.remove('is-loading');
                        button.classList.add('is-primary');
                        inputs.forEach(input => {
                            input.classList.remove('is-primary');
                        });
                        divElement.querySelector('#message').classList.remove('is-primary');
                        const icon = divElement.querySelectorAll('.is-right');
                        icon.forEach(i => {
                            i.style.visibility = 'hidden';
                        })
                        contactForm.reset();
                    }
                })
        }
    });
    /* END */

    const response = await Api.getSnapshot('contact');
    const data = response.val();

    const divAddresses = divElement.querySelector('#addresses');
    data.addresses.forEach(item => {
        divAddresses.innerHTML += `<div class="column is-6">
        <h3 class="is-size-4 py-1">${item.title}</h3>
        <p>${item.address}<br>
            <strong>Teléfono:</strong><a href="tel:${item.phone}">${item.phone}</a> <br>
            <strong>Correo electrónico: </strong><a href="mailto:${item.email}">${item.email}</a>
        </p>
        </div>`
    });

    const links = divElement.querySelectorAll('.menu-list a');
    links.forEach((a, index) => {
        a.setAttribute('href', data.links[index].url);
        a.innerHTML = data.links[index].title + ' <i class="fas fa-external-link-alt"></i>';
    })


    return divElement;
}

function checkInputs() {
    const emailValue = email.value.trim();
    let flag = 0;
    if (name.value.length < 1) {
        setErrorFor(name, 'El nombre no puede ser vacío');
    } else {
        setSuccessFor(name);
        flag += 1;
    }
    if (subject.value.length < 1) {
        setErrorFor(subject, 'El asunto no puede ser vacío');
    } else {
        setSuccessFor(subject);
        flag += 1;
    }
    if (emailValue === '') {
        setErrorFor(email, 'El correo electrónico no puede ser vacío');
    } else if (!isEmail(emailValue)) {
        setErrorFor(email, 'No es un correo electrónico válido');
    } else {
        setSuccessFor(email);
        flag += 1;
    }
    if (message.value.length < 1) {
        setErrorFor(message, 'Escribe algo 💡');
    } else {
        setSuccessFor(message);
        flag += 1;
    }
    flag >= 4 ? error = false : error = true;

}

function setErrorFor(input, message) {
    const formControl = input.parentElement.parentElement;
    const small = formControl.querySelector('.help');
    const icon = formControl.querySelector('.icon.is-right');
    input.className += ' is-danger';
    small.style.visibility = 'visible';
    if (icon) {
        icon.style.visibility = 'visible';
        icon.innerHTML = `<i class="fas fa-exclamation-circle" style="color:#f14668;"></i>`;
    }
    small.innerText = message;
}

function setSuccessFor(input) {
    const formControl = input.parentElement.parentElement;
    const small = formControl.querySelector('.help');
    const icon = formControl.querySelector('.icon.is-right');
    small.style.visibility = 'hidden';
    if (icon) {
        input.className = 'input is-primary';
        icon.style.visibility = 'visible';
        icon.innerHTML = `<i class="fas fa-check" style="color:#1b3041;"></i>`;
    } else {
        input.className = 'textarea is-primary';
    }
}

function isEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}