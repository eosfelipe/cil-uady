require('./css/styles.scss');
require('./fa/all.min.js');
require('./js/scrollIt.js');
import bulmaCarousel from '../node_modules/bulma-carousel/dist/js/bulma-carousel.min.js';
import {
    router
} from './router/index.routes';
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
    consoleHello();
    // if(window.location.pathname === '/'){
    //     const href = window.location.href;
    //     window.location.replace(href + '#/');
    // }
    // const route = window.location.href.split('/');
    // if(route.length > 2){

    // }
    if (window.location.hash === '') {
        const location = window.location.href;
        window.location.replace(location + '#/');
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
    // console.log(response);
    const home = response.val();
    // console.log(home);
    home.carousel.forEach((item, key) => {
        heroCarousel.innerHTML += `
        <div class="item-${key} banner">
            <img src="${item.img}" class="fitBg" alt="">
            <div class="content-custom has-text-centered">
                <h2 class="has-text-light">${item.title}</h2>
                <h1 class="is-size-1 has-text-warning has-text-weight-bold">${item.subtitle}</h1>
                <h2 class="has-text-primary has-text-cursive">${item.subtitle2}</h2>
                <button class="button is-warning is-medium">
                    ${item.link}
                </button>
            </div>
        </div>`;
    });


    bulmaCarousel.attach('#carouselHome', {
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
        document.querySelector('#navbarMenu').classList.toggle('is-active');
        document.querySelector('.navbar-burger').classList.toggle('is-active');
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

function consoleHello() {
    const ua = navigator.userAgent.toLocaleLowerCase();
    const supported = /(chrome|firefox)/;

    if(supported.test(ua.toLocaleLowerCase())) {
        let dark = ['padding: 18px 5px 18px', 'background-color: #171718', 'color: #e74c3c'].join(';');

        if(ua.indexOf('chrome') > -1 ) {
            dark += ';';
            dark += ['padding: 18px 5px 18px 40px', 'background-image: url()', 'background-position: 10px 9px', 'background-repeat: no-repeat', 'background-size: 30px 30px'].join(';');
        }

        const red = ['padding: 18px 5px 16px', 'background-color: #e74c3c', 'color: #ffffff'].join(';');
        const spacer = ['background-color: transparent'].join(';');
        const message = '%c Crafted with ❤ by MajorTom %c https://majortom.space %c';

        console.log(message, dark, red, spacer);
    } else if (window.console) console.log('Crafted with love by MajorTom - https://majortom.space');
}