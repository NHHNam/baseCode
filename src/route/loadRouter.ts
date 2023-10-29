import { Express } from "express";
import adminRouter from "./Admin.Route"
import userRouter from "./User.Route";
import  swaggerJsdoc from "swagger-jsdoc"
import  swaggerUi from "swagger-ui-express"
const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Your API Title',
        version: '1.0.0',
        description: 'Your API Description',
      },
    },
    apis: [`${__dirname}/swagger/swagger.api.ts`],
  };
  const specs = swaggerJsdoc(options);

const routes = (app: Express) => {
    app.use(
        "/api-docs",
        swaggerUi.serve,
        swaggerUi.setup(specs)
      );
    app.use("/user", userRouter);
    app.use("/admin",adminRouter);
};

export default routes;


