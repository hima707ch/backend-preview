/*
API Endpoints Summary:

1. User Authentication:
   - POST /api/auth/register
     Request: { username: string, email: string, password: string }
     Response: { message: string }
   - POST /api/auth/login
     Request: { username: string, password: string }
     Response: { token: string }

2. Products:
   - GET /api/products
     Response: [{ _id: string, name: string, description: string, price: number, stock: number }]
   - POST /api/products
     Request: { name: string, description: string, price: number, stock: number }
     Response: { _id: string, name: string, description: string, price: number, stock: number }
   - PUT /api/products/:productId
     Request: { name?: string, description?: string, price?: number, stock?: number }
     Response: { _id: string, name: string, description: string, price: number, stock: number }
   - DELETE /api/products/:productId
     Response: { message: string }

3. Orders:
   - GET /api/orders
     Response: [{ _id: string, user: Object, products: Array, totalAmount: number, status: string }]
   - POST /api/orders
     Request: { products: [{ product: string, quantity: number }], totalAmount: number }
     Response: { _id: string, user: string, products: Array, totalAmount: number, status: string }
   - GET /api/orders/:orderId
     Response: { _id: string, user: Object, products: Array, totalAmount: number, status: string }
   - DELETE /api/orders/:orderId
     Response: { message: string }

Note: All endpoints except /api/auth/register and /api/auth/login require authentication token in the Authorization header.
*/
