/*
API Endpoints Summary:

1. POST /api/users/register
   - Description: Register new user
   - Request Body: { username, email, password, role }
   - Response: { message: 'User registered successfully' }

2. POST /api/users/login
   - Description: User authentication
   - Request Body: { email, password }
   - Response: { token, userId, role }

3. GET /api/users/:id
   - Description: Get user details
   - Headers: Authorization: Bearer <token>
   - Response: User object (excluding password)

4. POST /api/properties/add
   - Description: Add new property listing
   - Headers: Authorization: Bearer <token>
   - Request Body: { title, description, type, price, location, bedrooms, bathrooms, area }
   - Response: Created property object

5. GET /api/properties/list
   - Description: Get property listings
   - Query Parameters: type, location, minPrice, maxPrice
   - Response: Array of property objects

6. GET /api/properties/:id
   - Description: Get specific property details
   - Response: Property object with seller details

Note: Default admin credentials:
- Email: admin
- Password: admin
*/