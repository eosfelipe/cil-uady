require('./css/styles.scss');
require('./fa/all.min.js');
const logo = require('./img/logo.png');
const nosotrosImg = require('./img/nosotros.jpg');

const img = document.querySelector('#logo');
const img2 = document.querySelector('#nosotros-img');
img.src = logo.default;
img2.src = nosotrosImg.default;

const ano = document.querySelector('#ano');
ano.innerHTML = new Date().getFullYear();

/* COUNTER SECTION */
function counterInit() {
    const counters = document.querySelectorAll('.counter');
    const speed = 2000;

    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;

            const inc = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 1);
                // console.log(count);
            } else {
                count.innerText = target;
            }
        }
        updateCount();
    });
}
counterInit();
/*END*/

/*  NEWSLETTER SECTION */
const newsletterForm = document.querySelector('#newsletterForm');
const newsletterInput = document.querySelector('#newsletterInput');
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
        newsletterForm.reset();
    }
});
/* END */

/* CONTACT SECTION */
const contactForm = document.querySelector('#contactForm');
const name = document.querySelector('#name');
const email = document.querySelector('#email');
const subject = document.querySelector('#subject');
const message = document.querySelector('#message');
let error = null;

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    checkInputs();
    // console.log(error);
    const formData = new FormData(e.target);
    // console.log(formData);
    if (!error) {
        contactForm.reset();
    }
});

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
/* END */