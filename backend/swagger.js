const swaggerUi = require('swagger-ui-express');
const swaggereJsdoc = require('swagger-jsdoc');

const options = {
     swaggerDefinition: { 
         info: { 
            title: 'DG-Market REST API DOCUMENT',
            version: '1.0.1',
            description: 'REST API DOC For DG-Market',
        },
        host: 'dg-market.iptime.org:28019',
        basePath: '/'
    },
    apis: ['./router/*.js', './swagger/*'] 
}; 

const specs = swaggereJsdoc(options); 

module.exports = { swaggerUi, specs };
