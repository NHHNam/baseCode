import dotenv from "dotenv";
import express from "express";
import http from "http";
import cors from "cors";
import routes from "./routes/route";
import * as swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

dotenv.config();

const app = express();
export const server = http.createServer(app);

const corOptions = {
    origin: true,
    credentials: true,
};

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(corOptions));

const options = {
    definition: {
        openapi: "3.0.1",
        info: {
            title: "Hello World",
            version: "1.0.0",
        },
        components: {
            schemas: {
                User: {
                    type: "object",
                    properties: {
                        id: {
                            type: "integer",
                        },
                        username: {
                            type: "string",
                        },
                        password: {
                            type: "string",
                        },
                        name: {
                            type: "string",
                        },
                    },
                },
                Post: {
                    type: "object",
                    properties: {
                        id: {
                            type: "integer",
                        },
                        name: {
                            type: "string",
                        },
                        description: {
                            type: "string",
                        },
                    },
                },
            },
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ["./src/routes/user.route.ts", "./src/routes/post.route.ts"], // files containing annotations as above
};

const openApiSpecification = swaggerJsdoc(options);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openApiSpecification));

routes(app);

const port = process.env.PORT || 4003;
server.listen(port, () => console.log("connected to port " + port));
