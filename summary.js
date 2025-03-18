/*
API Endpoints Summary:

1. Authentication Endpoints:
   - POST /auth/register
     Request body: { username: string, password: string }
     Response: { message: string }

   - POST /auth/login
     Request body: { username: string, password: string }
     Response: { token: string }

2. Property Endpoints:
   - GET /properties
     Response: Array of properties
     No authentication required

   - GET /properties/:id
     Response: Single property object
     No authentication required

   - POST /properties
     Request body: { title: string, description: string, price: number, location: string }
     Headers: Authorization: Bearer <token>
     Response: Created property object

   - PUT /properties/:id
     Request body: { title?: string, description?: string, price?: number, location?: string }
     Headers: Authorization: Bearer <token>
     Response: Updated property object

   - DELETE /properties/:id
     Headers: Authorization: Bearer <token>
     Response: { message: string }

Note: The default admin user is created with:
- Username: "admin"
- Password: "admin"
*/
