/*
API Endpoints Summary:

1. Authentication:
   - POST /api/auth/login
     Request: { email: string, password: string }
     Response: { token: string, user: { id: string, email: string, role: string } }
   
   - POST /api/auth/register
     Request: { email: string, password: string, name: string, phone: string }
     Response: { token: string, user: { id: string, email: string, role: string } }

2. Property Management:
   - GET /api/properties
     Query params: { location?: string, minPrice?: number, maxPrice?: number, status?: string }
     Response: Array of property objects
   
   - POST /api/properties
     Headers: Authorization: Bearer {token}
     Request: { title: string, description: string, price: number, location: string, bedrooms?: number, bathrooms?: number, area?: number }
     Response: Property object
   
   - GET /api/properties/:id
     Response: Property object with owner details
   
   - PUT /api/properties/:id
     Headers: Authorization: Bearer {token}
     Request: Property update fields
     Response: Updated property object
   
   - DELETE /api/properties/:id
     Headers: Authorization: Bearer {token}
     Response: { message: string }

3. User Profile Management:
   - GET /api/user/profile
     Headers: Authorization: Bearer {token}
     Response: User object (excluding password)
   
   - PUT /api/user/profile
     Headers: Authorization: Bearer {token}
     Request: { name?: string, phone?: string }
     Response: Updated user object (excluding password)
*/