/*
API Endpoints Summary:

Authentication Endpoints:
1. POST /api/register
   - Request: { username: string, password: string, email: string }
   - Response: { message: string }

2. POST /api/login
   - Request: { username: string, password: string }
   - Response: { token: string }

3. GET /api/user
   - Headers: Authorization: Bearer <token>
   - Response: { _id: string, username: string, email: string, createdAt: date }

Property Endpoints (all require Authorization header):
1. POST /api/properties
   - Request: { title: string, description: string, price: number, location: string, type: string, bedrooms: number, bathrooms: number, area: number }
   - Response: Property object

2. GET /api/properties
   - Query Parameters: Any property field for filtering
   - Response: Array of property objects

3. GET /api/properties/:id
   - Response: Property object

4. PUT /api/properties/:id
   - Request: Any property fields to update
   - Response: Updated property object

5. DELETE /api/properties/:id
   - Response: { message: string }

Database Initialization:
- Default admin user: username: 'admin', password: 'admin'
- Sample properties are created automatically
*/
