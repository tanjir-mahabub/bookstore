
const swaggerDocs = {
    tags: [
      {
        name: 'Books',
        description: 'API operations for managing books',
      },
    ],
    paths: {
      '/books': {
        get: {
          tags: ['Books'],
          description: 'Get a paginated list of books',
          parameters: [
            // ... (your parameters here)
          ],
          responses: {
            '200': {
              description: 'Successful response. Returns a list of books.',
            },
            // ... (other responses)
          },
        },
        // ... (other HTTP methods)
      },
      '/books/{id}': {
        get: {
          tags: ['Books'],
          description: 'Get details of a specific book by ID',
          parameters: [
            // ... (your parameters here)
          ],
          responses: {
            '200': {
              description: 'Successful response. Returns details of the book.',
            },
            // ... (other responses)
          },
        },
        // ... (other HTTP methods)
      },
    },
  };
  
  export default swaggerDocs;
  