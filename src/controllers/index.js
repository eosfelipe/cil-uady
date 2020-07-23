import Home from './home.controller';
import About from './about.controller';
import Services from './services.controller';
import Calls from './calls.controller';
import Calendar from './calendar.controller';
import Contact from './contact.controller';
import NotFound from './404.controller';

const pages = {
    home: Home,
    about: About,
    services: Services,
    calls: Calls,
    calendar: Calendar,
    contact: Contact,
    notFound: NotFound
};

export { pages };