import UserRouter from './user.router.js';
import AdminRouter from './admin.router.js';
import SitesRouter from './sites.router.js';

const route = (app) => {
    app.use('/user', UserRouter);
    app.use('/admin', AdminRouter);
    app.use('/', SitesRouter);
};

export default route;
