# Express.js Delivery Management API

A RESTful API for managing deliveries, drivers, vehicles, customers and products built with Express.js, Prisma ORM, and MySQL.

## Features
* Authentication with JWT
* CRUD operations for:
    * Deliveries
    * Drivers
    * Vehicles
    * Customers
    * Products
* File uploads for driver photos
* Input validation with Joi
* Database migrations with Prisma
* Containerized development environment

## Prerequisites
* Node.js 16+
* MySQL 5.7+ or MariaDB 10.4+
* Docker and Docker Compose (optional)

## Getting Started
1. Clone the repository:
2. Install dependencies:
```
npm install
```

3. Set up environment variables:
Create a .env file in the root directory with:
```
DATABASE_URL="mysql://username:password@localhost:3306/pengiriman_barang"
JWT_SECRET="your-jwt-secret"
JWT_REFRESH_SECRET="your-refresh-token-secret"
PORT=5000
```

4. Run database migrations:
```
npx prisma migrate dev
```
5. Seed the database:
```
npx prisma db seed
```

## Development
Run the development server:
```
npm run dev
```
The API will be available at `http://localhost:5000`

## Project Structure
```
├── src/
│   ├── controllers/     # Request handlers
│   ├── middleware/      # Custom middleware
│   ├── routes/         # Route definitions
│   ├── validations/    # Input validation schemas
│   ├── prismaClient.js # Prisma client instance
│   └── app.js         # Express app setup
├── prisma/
│   ├── migrations/    # Database migrations
│   ├── schema.prisma # Database schema
│   └── seed.js      # Seed data
└── uploads/         # Uploaded files
```
## API Endpoints
### Auth Routes
* POST `/api/auth/register` - Register new admin
* POST `/api/auth/login` - Login
* POST `/api/auth/refresh-token` - Refresh access token
* POST `/api/auth/logout` - Logout
## Delivery Routes
* POST `/api/pengiriman` - Create delivery
* GET `/api/pengiriman` - List all deliveries
* GET `/api/pengiriman/:id` - Get delivery details
* PUT `/api/pengiriman/:id` - Update delivery
* DELETE `/api/pengiriman/:id` - Delete delivery
## Driver Routes
* POST `/api/supir` - Create driver
* GET `/api/supir` - List all drivers
* GET `/api/supir/:id` - Get driver details
* PATCH `/api/supir/:id` - Update driver
* DELETE `/api/supir/:id` - Delete driver

For complete API documentation, see the ....

## Testing

Tests are written with Jest and Supertest. To run the tests, create a .env.test file with the following configuration:
```
DATABASE_URL="mysql://username:password@localhost:3306/pengiriman_barang_test"
JWT_SECRET="your-jwt-secret"
JWT_REFRESH="your-refresh-token-secret"
PORT=5000
```

Run migration first:
```
npm run test:migrate
```

Run the test suite:
```
npm test
```

for testing specific file:
```
npm test -- tests/auth.test.js // change the file name
```

## Deployment
### Simple Deployment with PM2
1. Install PM2 globally:
```
npm install -g pm2
```
2. Start the application:
```
pm2 start src/app.js --name "delivery-api"
```
3. Save PM2 process list:
```
pm2 save
```
4. Setup PM2 to start on system boot:
```
pm2 startup
```