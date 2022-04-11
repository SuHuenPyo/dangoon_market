import swaggerUi from 'swagger-ui-express';
import swaggereJsdoc from 'swagger-jsdoc';

const options = {
     swaggerDefinition: { 
         info: { 
            title: 'DG-Market REST API DOCUMENT',
            version: '1.0.1',
            description: 'REST API DOC For DG-Market',
        },
        host: 'dangoon.duckdns.org',
        basePath: '/'
    },
    apis: ['./router/*.js', './swagger/*'] 
}; 

const specs = swaggereJsdoc(options); 

export { swaggerUi, specs };
