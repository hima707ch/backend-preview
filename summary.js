/*
API Endpoints Summary:

1. Authentication:
   - POST /api/login
     Request: { username, password }
     Response: { token, user: { username, email, role } }
   
   - POST /api/register
     Request: { username, email, password }
     Response: { token, user: { username, email, role } }

2. User Management:
   - GET /api/user/details
     Headers: { Authorization: 'Bearer <token>' }
     Response: { username, email, role, createdAt }
   
   - PUT /api/user/update
     Headers: { Authorization: 'Bearer <token>' }
     Request: { username, email }
     Response: { username, email, role, createdAt }

3. Property Management:
   - GET /api/properties/list
     Query Params: Optional filters
     Response: [{ title, description, price, location, owner, status }]
   
   - GET /api/properties/detail/:id
     Response: { title, description, price, location, owner, status }
   
   - POST /api/properties/create
     Headers: { Authorization: 'Bearer <token>' }
     Request: { title, description, price, location, status }
     Response: { property details }
   
   - PUT /api/properties/update/:id
     Headers: { Authorization: 'Bearer <token>' }
     Request: { title, description, price, location, status }
     Response: { updated property details }
   
   - DELETE /api/properties/delete/:id
     Headers: { Authorization: 'Bearer <token>' }
     Response: { message: 'Property deleted successfully' }

Note: All responses are in JSON format. Error responses include an 'error' field with description.
*/
