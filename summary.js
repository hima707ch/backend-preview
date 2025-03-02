/*
API Endpoints Summary:

1. User Management:
   - POST /api/register
     Request: { username, password, email }
     Response: { message: 'User registered successfully' }

   - POST /api/login
     Request: { username, password }
     Response: { token }

   - GET /api/user/profile
     Headers: { Authorization: 'Bearer <token>' }
     Response: User object (excluding password)

   - PUT /api/user/profile
     Headers: { Authorization: 'Bearer <token>' }
     Request: { fullName, phone, address }
     Response: Updated user object

2. Property Management:
   - GET /api/properties
     Response: Array of property objects

   - POST /api/properties
     Headers: { Authorization: 'Bearer <token>' }
     Request: { title, description, price, location, features, images }
     Response: Created property object

   - GET /api/properties/:id
     Response: Property object

   - PUT /api/properties/:id
     Headers: { Authorization: 'Bearer <token>' }
     Request: Property update fields
     Response: Updated property object

   - DELETE /api/properties/:id
     Headers: { Authorization: 'Bearer <token>' }
     Response: { message: 'Property deleted successfully' }

3. Admin Features:
   - GET /api/admin/users
     Headers: { Authorization: 'Bearer <token>' }
     Response: Array of user objects

   - DELETE /api/admin/users/:userId
     Headers: { Authorization: 'Bearer <token>' }
     Response: { message: 'User deleted successfully' }

   - GET /api/admin/listings
     Headers: { Authorization: 'Bearer <token>' }
     Response: Array of property objects with owner details

   - PUT /api/admin/listings/:listingId
     Headers: { Authorization: 'Bearer <token>' }
     Request: Property update fields
     Response: Updated property object

   - DELETE /api/admin/listings/:listingId
     Headers: { Authorization: 'Bearer <token>' }
     Response: { message: 'Listing deleted successfully' }
*/