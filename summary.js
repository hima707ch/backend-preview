/*
API Endpoints Summary:

1. User Authentication:
   a. POST /api/register
      - Request body: { username: string, password: string }
      - Response: { token: string }

   b. POST /api/login
      - Request body: { username: string, password: string }
      - Response: { token: string }

2. Property Management (All require Authorization header with Bearer token):
   a. GET /api/properties
      - Response: Array of properties
      - Each property: { _id, title, description, price, location, owner, createdAt, updatedAt }

   b. POST /api/properties
      - Request body: { title: string, description: string, price: number, location: string }
      - Response: Created property object

   c. PUT /api/properties/:propertyId
      - Request body: { title?: string, description?: string, price?: number, location?: string }
      - Response: Updated property object

   d. DELETE /api/properties/:propertyId
      - Response: { message: 'Property deleted successfully' }

Note: Default admin user credentials:
- Username: admin
- Password: admin
*/
