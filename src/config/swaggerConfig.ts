// swaggerConfig.ts
import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Amazing BookStore',
      version: '1.0.0',
      description: 'This is an e-commerce bookstore created for testing purposes.',
    },
    components: {
      schemas: {        
        Book: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            title: { type: 'string' },
            author: { type: 'string' },
          },
          example: {
            id: 1,
            title: 'Example Book',
            author: 'John Doe',
          },
        },
        Order: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            userId: { type: 'number' },
            cart: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'number' },
                  quantity: { type: 'number' },
                },
              },
            },
            totalPrice: { type: 'number' },
          },
          example: {
            userId: 3,
            cart: [
              { id: 1, quantity: 2 },
              { id: 2, quantity: 1 },
            ],
            totalPrice: 45.99,
          },
        },
        User: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            email: { type: 'string', format: 'email' },
            password: { type: 'string' },
          },
          example: {
            name: 'John Doe',
            email: 'john.doe@example.com',
            password: 'password123',
          },
        },
        UserProfile: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            email: { type: 'string', format: 'email' },
          },
          example: {
            name: 'John Doe',
            email: 'john.doe@example.com',
          },
        },
        AuthToken: {
          type: 'object',
          properties: {
            token: { type: 'string' },
          },
          example: {
            token: 'yourAuthTokenHere',
          },
        },
        Error: {
          type: 'object',
          properties: {
            message: { type: 'string' },
          },
        },
      },
    },
    paths: {
      '/books': {
        get: {
          summary: 'Get all books',
          description: 'Retrieve a list of books',
          parameters: [
            {
              in: 'query',
              name: 'page',
              description: 'Page number for pagination',
              required: false,
              schema: {
                type: 'integer',
                default: 1, // You can set a default value if needed
              },
            },
          ],
          responses: {
            '200': {
              description: 'Successful response',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Book',
                    },
                  },
                },
              },
            },
          },
        },
      },
      '/books/{id}': {
        get: {
          summary: 'Get a book by ID',
          description: 'Retrieve a book based on its ID',
          parameters: [
            {
              in: 'path',
              name: 'id',
              description: 'ID of the book',
              required: true,
              schema: {
                type: 'integer',
              },
            },
          ],
          responses: {
            '200': {
              description: 'Successful response',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Book',
                  },
                },
              },
            },
            '400': {
              description: 'Invalid book ID',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Error',
                  },
                },
              },
            },
            '404': {
              description: 'Book not found',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Error',
                  },
                },
              },
            },
          },
        },
      },
      '/order': {
        post: {
          summary: 'Create a new order',
          tags: ['Order'],
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Order',
                },
              },
            },
          },
          responses: {
            '201': {
              description: 'Order created successfully',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Order',
                  },
                },
              },
            },
            '404': {
              description: 'User not found or authentication failed',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Error',
                  },
                },
              },
            },
            '500': {
              description: 'Internal Server Error',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Error',
                  },
                },
              },
            },
          },
        },
      },
      '/orders': {
        get: {
          summary: 'Get all orders',
          tags: ['Order'],
          responses: {
            '200': {
              description: 'Successful response',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Order',
                    },
                  },
                },
              },
            },
            '500': {
              description: 'Internal Server Error',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Error',
                  },
                },
              },
            },
          },
        },
      },
      '/register': {
        post: {
          summary: 'Register a new user',
          tags: ['User'],
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/User',
                },
              },
            },
          },
          responses: {
            '201': {
              description: 'User registered successfully',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/User',
                  },
                },
              },
            },
            '400': {
              description: 'Bad request - missing required fields',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Error',
                  },
                },
              },
            },
            '403': {
              description: 'Forbidden - registration failed',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Error',
                  },
                },
              },
            },
          },
        },
      },
      '/login': {
        post: {
          summary: 'Login and get authentication token',
          tags: ['User'],
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  properties: {
                    email: { type: 'string', format: 'email' },
                    password: { type: 'string' },
                  },
                  required: ['email', 'password'],
                  example: {
                    email: 'john.doe@example.com',
                    password: 'password123',
                  },
                },
              },
            },
          },
          responses: {
            '201': {
              description: 'Login successful, returns authentication token',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/AuthToken',
                  },
                },
              },
            },
            '400': {
              description: 'Bad request - missing required fields',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Error',
                  },
                },
              },
            },
            '404': {
              description: 'User not found or incorrect credentials',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Error',
                  },
                },
              },
            },
          },
        },
      },
      '/profile': {
        get: {
          summary: 'Get user profile',
          tags: ['User'],
          security: [
            {
              bearerAuth: [], // Indicates that this route requires a bearer token
            },
          ],
          parameters: [
            {
              in: 'header',
              name: 'Authorization',
              description: 'Bearer token for authentication',
              required: true,
              schema: {
                type: 'string',
              },
            }
          ],
          responses: {
            '200': {
              description: 'User profile retrieved successfully',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/UserProfile',
                  },
                },
              },
            },
            '404': {
              description: 'User not found',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Error',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  apis: ['./src/controller/*.ts'],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
