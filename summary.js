/*
API Endpoints Summary:

1. Authentication (/auth)
   - POST /auth/register
     Request: { username, password, email }
     Response: { message: 'User registered successfully' }
   - POST /auth/login
     Request: { username, password }
     Response: { token }

2. Properties (/properties)
   - POST /properties
     Request: { title, description, price, location }
     Response: Created property object
   - GET /properties
     Response: Array of property objects
   - PUT /properties/:id
     Request: Updated property fields
     Response: Updated property object
   - DELETE /properties/:id
     Response: { message: 'Property deleted successfully' }

3. User Profile (/users)
   - PUT /users/profile
     Request: Updated user fields
     Response: Updated user object
   - DELETE /users/profile
     Response: { message: 'User profile deleted successfully' }

4. Admin Management (/admin)
   - GET /admin/analytics
     Response: Array of analytics objects
   - PUT /admin/users/:id
     Request: Updated user fields
     Response: Updated user object
   - DELETE /admin/users/:id
     Response: { message: 'User deleted successfully' }

Authentication:
- All endpoints except /auth/login and /auth/register require Bearer token
- Admin endpoints require admin role
*/
