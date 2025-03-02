/*
API Endpoints Summary:

1. Authentication APIs:
   - POST /api/login
     Request: { email: string, password: string }
     Response: { token: string, user: { id: string, email: string, role: string } }

   - POST /api/register
     Request: { email: string, password: string, name: string }
     Response: { token: string, user: { id: string, email: string, role: string } }

2. Property APIs:
   - GET /api/properties
     Response: Array of property objects

   - POST /api/property
     Auth: Required
     Request: { title: string, description: string, price: number, location: string }
     Response: Created property object

   - GET /api/property/:id
     Response: Single property object

   - PUT /api/property/:id
     Auth: Required (Owner or Admin)
     Request: Property fields to update
     Response: Updated property object

   - DELETE /api/property/:id
     Auth: Required (Owner or Admin)
     Response: { message: 'Property deleted' }

3. User APIs:
   - GET /api/user/profile
     Auth: Required
     Response: User object (excluding password)

   - PUT /api/user/profile/update
     Auth: Required
     Request: { name?: string, email?: string }
     Response: { message: string, user: object }

4. Admin APIs:
   - GET /api/admin/dashboard
     Auth: Required (Admin only)
     Response: {
       stats: { users: number, properties: number },
       recentProperties: array,
       recentUsers: array
     }

All APIs return appropriate error responses with status codes and messages.
*/