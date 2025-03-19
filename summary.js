/*
API Endpoints Summary:

1. User Management:
   a. POST /api/users/register
      - Request: { username: string, password: string, role: 'buyer'|'seller' }
      - Response: { message: string }
   
   b. POST /api/users/login
      - Request: { username: string, password: string }
      - Response: { token: string, role: string }

2. Property Management:
   a. GET /api/properties/list
      - Headers: Authorization: Bearer <token>
      - Response: Array of properties

   b. GET /api/properties/details/:id
      - Headers: Authorization: Bearer <token>
      - Response: Property details

   c. POST /api/properties/add
      - Headers: Authorization: Bearer <token>
      - Role: seller
      - Request: { title: string, description: string, price: number, location: string }
      - Response: Created property object

   d. POST /api/properties/edit/:id
      - Headers: Authorization: Bearer <token>
      - Role: seller
      - Request: { title?: string, description?: string, price?: number, location?: string }
      - Response: Updated property object

   e. DELETE /api/properties/delete/:id
      - Headers: Authorization: Bearer <token>
      - Role: seller
      - Response: { message: string }

Authentication:
- All property endpoints require JWT token authentication
- Token format: Bearer <token>
- Seller-specific endpoints check for seller role
*/
