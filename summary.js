/*
API Endpoints Summary:

1. Authentication
   - POST /api/login
     Request: { username: string, password: string }
     Response: { token: string, userId: string }

   - POST /api/register
     Request: { username: string, email: string, password: string }
     Response: { token: string, userId: string }

2. Property Management
   - GET /api/properties/search
     Query Parameters: { city?: string, minPrice?: number, maxPrice?: number }
     Response: Array of property objects

   - GET /api/properties/:id
     Response: Single property object

   - POST /api/user/:userId/save-property
     Request: { propertyId: string }
     Response: Updated user object

   - DELETE /api/user/:userId/remove-property/:propertyId
     Response: Updated user object

3. User Management
   - GET /api/user/:userId
     Response: User object (excluding password)

   - POST /api/user/:userId/update
     Request: { name: string, phone: string, address: string }
     Response: Updated user object

Database Models:
1. User Schema:
   - username (String, required, unique)
   - password (String, required)
   - email (String, required, unique)
   - savedProperties (Array of Property references)
   - profile: { name, phone, address }

2. Property Schema:
   - title (String, required)
   - description (String, required)
   - price (Number, required)
   - location: { address, city, state, zipCode }
   - features (Array of Strings)
   - images (Array of Strings)
   - createdAt (Date)
*/
