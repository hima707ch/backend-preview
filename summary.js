/*
API Endpoints Summary:

1. Authentication APIs:
   - POST /api/auth/register
     Request: { email: string, password: string, name: string }
     Response: { message: string }

   - POST /api/auth/login
     Request: { email: string, password: string }
     Response: { token: string }

   - POST /api/auth/logout
     Response: { message: string }

2. Property APIs:
   - GET /api/properties
     Query Parameters: Any property field for filtering
     Response: Array of property objects

   - POST /api/properties
     Request: {
       title: string,
       description: string,
       price: number,
       location: string,
       bedrooms: number,
       bathrooms: number,
       area: number,
       type: string
     }
     Response: Created property object

   - GET /api/properties/:id
     Response: Property object

   - PUT /api/properties/:id
     Request: Updated property fields
     Response: Updated property object

   - DELETE /api/properties/:id
     Response: { message: string }

3. User Profile APIs:
   - GET /api/user/profile
     Response: User object (excluding password)

   - PUT /api/user/profile
     Request: Updated user fields
     Response: Updated user object (excluding password)

Note: All APIs except /api/auth/* require Bearer token authentication
*/
