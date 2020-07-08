require('./css/styles.scss');
require('./fa/all.min.js');
import bulmaCarousel from '../node_modules/bulma-carousel/dist/js/bulma-carousel.min.js';
import Api from './Api';
import config from './firebase';

const logo = require('./img/logo.png');
const nosotrosImg = require('./img/nosotros.jpg');

const img = document.querySelector('#logo');
const img2 = document.querySelector('#nosotros-img');
img.src = logo.default;
img2.src = nosotrosImg.default;

const ano = document.querySelector('#ano');
ano.innerHTML = new Date().getFullYear();

const heroCarousel = document.querySelector('#carouselHome');

document.addEventListener('DOMContentLoaded', async () => {

    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {

        // Add a click event on each of them
        $navbarBurgers.forEach(el => {
            el.addEventListener('click', () => {

                // Get the target from the "data-target" attribute
                const target = el.dataset.target;
                const $target = document.getElementById(target);

                // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
                el.classList.toggle('is-active');
                $target.classList.toggle('is-active');

            });
        });
    }

    const home = await getSnapshot('home');

    // console.log(home.val());
    // home.val().forEach( item => {
    //     console.log(item);

    //     heroCarousel.innerHTML = `
    //     <div class="item-1 banner">
    //         <img src="${data.img}" class="fitBg" alt="">
    //         <div class="content-custom has-text-centered">
    //             <h2 class="has-text-light has-text-shadow">${data.title}</h2>
    //             <h1 class="is-size-1 has-text-warning has-text-weight-bold">${data.subtitle}</h1>
    //             <h2 class="has-text-primary has-text-cursive">${data.subtitle2}</h2>
    //             <button class="button is-primary is-outlined is-medium">
    //                 ${data.link}
    //             </button>
    //         </div>
    //     </div>`;
    // });

    // bulmaCarousel.attach(heroCarousel, {
    //     slidesToScroll: 1,
    //     slidesToshow: 3,
    //     autoplay: true,
    //     infinite: true
    // });
    counterInit();
});
/* FUNCTIONS FIREBASE */
firebase.initializeApp(config);
const db = firebase.database();
const getSnapshot = (page) => db.ref(`/${page}/`).once('value');

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
            }
        }
        updateCount();
    });
}
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
        //fetch to end_point manage newsletter
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
        const dt = new Date().toJSON().slice(0, 19).replace('T', ' ');
        let queryString = new URLSearchParams(formData).toString();
        queryString += `&date_time=${dt}`;
        Api.END_POINT_CONTACT += queryString;

        fetch(Api.END_POINT_CONTACT)
            .then(response => response.json())
            .catch(error => console.error('Error:', error))
            .then(json => console.log(json))
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