import config from '~/config/indexConfig';

import Home from '~/pages/Home/Home';
import Profile from '~/pages/Profile/Profile';

export const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.profile, component: Profile, layout: null },
];

export const privateRoutes = [];
