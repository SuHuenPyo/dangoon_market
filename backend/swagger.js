const swaggerUi = require('swagger-ui-express');
const swaggereJsdoc = require('swagger-jsdoc');

const options = {
     swaggerDefinition: { 
         info: { 
            title: 'Dangoon Market API',
            version: '1.0.1',
            description: 'API For DG-Market',
        },
        host: 'localhost:3300',
        basePath: '/'
    },
    apis: ['./router/*.js', './swagger/*'] 
}; 

const specs = swaggereJsdoc(options); 

module.exports = { swaggerUi, specs };
