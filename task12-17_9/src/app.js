import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import route from './routes/index.router.js';
import connectMongoose from './databases/mongoose.int.js';

const app = express();

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    }),
);

const options = {
    definition: {
        info: {
            title: 'api',
            version: '1.0.0',
        },
    },
    apis: ['src/swagger/index.swagger.js'],
};

const specs = swaggerJsDoc(options);
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(specs));

// connect to mongoose
connectMongoose();

// route
route(app);

export default app;
