/*
API Endpoints Summary:

1. Authentication:
   - POST /api/login
     Request: { username: string, password: string }
     Response: { token: string, user: { id: string, username: string, email: string } }

   - POST /api/register
     Request: { username: string, email: string, password: string }
     Response: { token: string, user: { id: string, username: string, email: string } }

2. User Profile:
   - GET /api/profile
     Headers: Authorization: Bearer <token>
     Response: { _id: string, username: string, email: string, name: string, phone: string }

   - PUT /api/profile/update
     Headers: Authorization: Bearer <token>
     Request: { name: string, phone: string, email: string }
     Response: { _id: string, username: string, email: string, name: string, phone: string }

3. Properties:
   - GET /api/properties
     Response: Array of properties with owner details

   - GET /api/properties/:id
     Response: Single property object with owner details

   - POST /api/user/properties/add
     Headers: Authorization: Bearer <token>
     Request: { title: string, description: string, price: number, location: string, features: string[], images: string[] }
     Response: Created property object

   - PUT /api/user/properties/:id/edit
     Headers: Authorization: Bearer <token>
     Request: Property fields to update
     Response: Updated property object

   - DELETE /api/user/properties/:id/delete
     Headers: Authorization: Bearer <token>
     Response: { message: 'Property deleted successfully' }

Note: All responses include appropriate error messages and status codes for failed requests.
*/
