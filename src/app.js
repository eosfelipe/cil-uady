require('./css/styles.scss');
require('./fa/all.min.js');
import bulmaCarousel from '../node_modules/bulma-carousel/dist/js/bulma-carousel.min.js';
import { router } from './router/index.routes';
import Api from './Api';

const logo = require('./img/logo.png');
const logoUady = require('./favicon.svg');

const img = document.querySelector('#logo');
const img3 = document.querySelector('#logoUady');
img.src = logo.default;
img3.src = logoUady.default;

const ano = document.querySelector('#ano');
ano.innerHTML = new Date().getFullYear();

const heroCarousel = document.querySelector('#carouselHome');

document.addEventListener('DOMContentLoaded', async () => {
    if(window.location.pathname === '/'){
        const href = window.location.href;
        window.location.replace(href + '#/');
    }
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

    const response = await Api.getSnapshot('home');
    const home = response.val();
    home.carousel.forEach((item, key) => {
        heroCarousel.innerHTML += `
        <div class="item-${key} banner">
            <img src="${item.img}" class="fitBg" alt="">
            <div class="content-custom has-text-centered">
                <h2 class="has-text-light has-text-shadow">${item.title}</h2>
                <h1 class="is-size-1 has-text-warning has-text-weight-bold">${item.subtitle}</h1>
                <h2 class="has-text-primary has-text-cursive">${item.subtitle2}</h2>
                <button class="button is-warning is-medium">
                    ${item.link}
                </button>
            </div>
        </div>`;
    })

    bulmaCarousel.attach(heroCarousel, {
        slidesToScroll: 1,
        slidesToshow: 3,
        autoplay: true,
        infinite: true,
        duration: 2000,
        autoplaySpeed: 4000
    });
    activeNavbar();
    counterInit();
    loading();
});

const init = () => {
    router(window.location.hash);
    window.addEventListener('hashchange', () => {
        router(window.location.hash);
        activeNavbar();
        counterInit();
    });
};

const loading = () => {
    const pre = document.getElementById('preloader');
    setTimeout(() => {
        pre.classList.add('hide');
        pre.classList.remove('show');
    }, 3000);
}

window.addEventListener('load', init);

function activeNavbar() {
    const active = document.querySelectorAll('.navbar-start .navbar-item');
    active.forEach(item => {
        // console.log(item.getAttribute('href'), window.location.hash);
        if (item.getAttribute('href') === window.location.hash) {
            item.classList.add('is-active');
        } else {
            item.classList.remove('is-active');
        }
    })
}

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
// const newsletterForm = document.querySelector('#newsletterForm');
// const newsletterInput = document.querySelector('#newsletterInput');
// newsletterForm.addEventListener('submit', (e) => {
//     e.preventDefault();
//     const inputValue = newsletterInput.value.trim();
//     const control = newsletterInput.parentElement;
//     const small = control.querySelector('.help');
//     if (!isEmail(inputValue)) {
//         small.style.visibility = 'visible';
//         small.innerHTML = 'Ingresa un correo electrónico válido';
//     } else {
//         small.style.visibility = 'hidden';
//         console.log('valid email');
//         //fetch to end_point manage newsletter
//         newsletterForm.reset();
//     }
// });
/* END */


