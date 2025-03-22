/*
API Endpoints Summary:

Authentication Module:
1. POST /api/login
   - Request: { username: string, password: string }
   - Response: { token: string }

2. POST /api/register
   - Request: { username: string, password: string, email: string }
   - Response: { message: string }

Property Management Module:
1. GET /api/properties
   - Response: Array of property objects

2. POST /api/properties
   - Request: { title: string, description: string, price: number, location: string }
   - Response: Created property object

3. GET /api/properties/:id
   - Response: Single property object

4. PUT /api/properties/:id
   - Request: { title?: string, description?: string, price?: number, location?: string }
   - Response: Updated property object

5. DELETE /api/properties/:id
   - Response: { message: string }

User Management Module:
1. GET /api/user/:id
   - Response: User object (excluding password)

2. PUT /api/user/:id
   - Request: { username?: string, email?: string }
   - Response: Updated user object

3. GET /api/user/properties
   - Response: Array of properties owned by user

Admin Module:
1. GET /api/admin/users
   - Response: Array of user objects

2. DELETE /api/admin/users/:id
   - Response: { message: string }

3. GET /api/admin/properties
   - Response: Array of all properties

All protected routes require Authorization header with Bearer token.
Admin routes require admin privileges.
*/