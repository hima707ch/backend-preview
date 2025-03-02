/*
API Endpoints Summary:

User Management:
1. POST /api/register
   - Request: { username, email, password }
   - Response: { message: 'User registered successfully' }

2. POST /api/login
   - Request: { username, password }
   - Response: { token: 'JWT_TOKEN' }

3. GET /api/user/profile
   - Headers: Authorization: Bearer TOKEN
   - Response: { user details }

4. PUT /api/user/profile
   - Headers: Authorization: Bearer TOKEN
   - Request: { updated user fields }
   - Response: { message: 'Profile updated successfully' }

Property Management:
1. GET /api/properties
   - Query Parameters: Optional filters
   - Response: [{ property details }]

2. POST /api/properties
   - Headers: Authorization: Bearer TOKEN
   - Request: { title, description, price, location }
   - Response: { created property details }

3. GET /api/properties/:id
   - Response: { property details }

4. PUT /api/properties/:id
   - Headers: Authorization: Bearer TOKEN
   - Request: { updated property fields }
   - Response: { updated property details }

5. DELETE /api/properties/:id
   - Headers: Authorization: Bearer TOKEN
   - Response: { message: 'Property deleted successfully' }

Admin Features:
1. GET /api/admin/users
   - Headers: Authorization: Bearer TOKEN
   - Response: [{ user details }]

2. DELETE /api/admin/users/:userId
   - Headers: Authorization: Bearer TOKEN
   - Response: { message: 'User deleted successfully' }

3. GET /api/admin/listings
   - Headers: Authorization: Bearer TOKEN
   - Response: [{ property details with owner info }]

4. PUT /api/admin/listings/:listingId
   - Headers: Authorization: Bearer TOKEN
   - Request: { updated property fields }
   - Response: { updated property details }

5. DELETE /api/admin/listings/:listingId
   - Headers: Authorization: Bearer TOKEN
   - Response: { message: 'Listing deleted successfully' }
*/