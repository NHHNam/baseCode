//Config swagger
const options = {
    definition: {
        //openapi: '3.0.0',
        info: {
            title: 'API_BE_AIKING',
            version: '1.0.0',
        }

    },
    apis: ['./swagger/swagger.js'],
};
module.exports = options;