import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Amazing BookStore',
      version: '1.0.0',
      description: 'This is a e-commerce bookstore created for testing purpose',
    },
  },
  apis: ['../controller/*.ts'], 
};

const swaggerSpec = swaggerJsdoc(options);
console.log(swaggerJsdoc);

export default swaggerSpec;
