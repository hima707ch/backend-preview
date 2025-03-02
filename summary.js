/*
API Endpoints Summary:

1. Authentication:
   - POST /api/login
     Request: { username: string, password: string }
     Response: { token: string, userId: string }

   - POST /api/register
     Request: { username: string, email: string, password: string }
     Response: { message: string, userId: string }

2. Properties:
   - GET /api/properties
     Query params: minPrice, maxPrice, location
     Response: Array of property objects

   - POST /api/properties
     Request: { title: string, description: string, price: number, location: string, ... }
     Response: Created property object

   - GET /api/properties/:id
     Response: Single property object

   - PUT /api/properties/:id
     Request: Updated property fields
     Response: Updated property object

   - DELETE /api/properties/:id
     Response: { message: string }

3. User Profile:
   - GET /api/user/:id
     Response: User object (excluding password)

   - PUT /api/user/:id
     Request: Updated user fields
     Response: Updated user object

   - DELETE /api/user/:id
     Response: { message: string }

All protected routes require Authorization header with Bearer token.
*/
