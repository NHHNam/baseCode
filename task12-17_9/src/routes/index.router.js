import UserRouter from './user.router.js';
import AdminRouter from './admin.router.js';

const route = (app) => {
    app.use('/user', UserRouter);
    app.use('/admin', AdminRouter);
};

export default route;
