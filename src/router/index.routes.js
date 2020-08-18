import { pages } from '../controllers/index';

const router = async (route) => {
    let content = document.getElementById('root');
    content.innerHTML = '';
    
    switch (route) {
        case '#/': {
            return content.appendChild(await pages.home());
        }
        case '#/about': {
            return content.appendChild(await pages.about());
        }
        case '#/services': {
            return content.appendChild(await pages.services());
        }
        case '#/calls': {
            return content.appendChild(await pages.calls());
        }
        case '#/calendar': {
            return content.appendChild(pages.calendar());
        }
        case '#/contact': {
            return content.appendChild(await pages.contact());
        }
        default: {
            return content.appendChild(pages.notFound());
        }
    }
};

export { router };