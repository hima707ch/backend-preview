/*
API Endpoints Summary:

1. User Authentication:
   a. POST /api/register
      - Request body: { username, password, role }
      - Role must be either 'buyer' or 'seller'
      - Response: { message: 'User registered successfully' }

   b. POST /api/login
      - Request body: { username, password }
      - Response: { token, role }

2. Property Management:
   a. GET /api/properties
      - Query parameters: minPrice, maxPrice, location (all optional)
      - Response: Array of property objects

   b. GET /api/properties/:id
      - Response: Single property object

   c. POST /api/properties (Sellers only)
      - Headers: Authorization: Bearer <token>
      - Request body: { title, description, price, location, features, images }
      - Response: Created property object

   d. PUT /api/properties/:id (Sellers only)
      - Headers: Authorization: Bearer <token>
      - Request body: Updated property fields
      - Response: Updated property object

   e. DELETE /api/properties/:id (Sellers only)
      - Headers: Authorization: Bearer <token>
      - Response: { message: 'Property deleted successfully' }

Note: All error responses follow the format: { message: 'Error description' }
*/
