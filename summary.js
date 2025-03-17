/*
API Endpoints Summary:

1. Authentication APIs:
   - POST /api/login
     Request: { username: string, password: string }
     Response: { token: string, userId: string }

   - POST /api/register
     Request: { username: string, email: string, password: string }
     Response: { token: string, userId: string }

2. Property APIs:
   - GET /api/properties/search
     Query Parameters: type, city, minPrice, maxPrice
     Response: Array of property objects

   - GET /api/properties/:id
     Response: Single property object

3. User Management APIs:
   - GET /api/user/:userId
     Response: User object (excluding password) with populated savedProperties

   - POST /api/user/:userId/update
     Request: { name: string, phone: string, address: string }
     Response: Updated user object

   - POST /api/user/:userId/save-property
     Request: { propertyId: string }
     Response: Updated user object

   - DELETE /api/user/:userId/remove-property/:propertyId
     Response: Updated user object

Database Models:
1. User Model:
   - username (String, required, unique)
   - password (String, required)
   - email (String, required, unique)
   - savedProperties (Array of Property references)
   - profile (Object: name, phone, address)

2. Property Model:
   - title (String, required)
   - description (String, required)
   - price (Number, required)
   - location (Object: address, city, state, zipCode)
   - features (Array of Strings)
   - images (Array of Strings)
   - type (String)
   - status (String)
   - createdAt (Date)
*/
