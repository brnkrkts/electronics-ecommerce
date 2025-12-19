#  Electronics E-Commerce Platform

**Full-Stack E-Commerce Application — Next.js · MongoDB · Stripe · AWS S3 · Docker · NextAuth**

A complete, production-style e-commerce platform consisting of:

* Customer-facing storefront (`front/`)
* Fully featured admin dashboard (`admin/`)
* Secure authentication (Google OAuth)
* Product, category, order & settings management
* Stripe-powered checkout
* AWS S3 image uploads
* Docker-based local environment
* Automated Jest test suites for key backend APIs

This project is structured exactly like a real-world SaaS/e-commerce system and demonstrates skills in frontend development, backend APIs, authentication, DevOps, database modeling, CI-friendly architecture, and testing.


##  Features

### Frontend Storefront (`front/`)

* Product listing, filtering, search
* Product detail pages
* Shopping cart with quantity tracking
* DB-configured shipping fee
* Stripe checkout with line items
* Google OAuth authentication
* Responsive UI (Next.js + Styled Components)

### Admin Dashboard (`admin/`)

* Google OAuth login for admins
* Role-based authorization (`isAdminRequest`)
* Product CRUD with image uploads
* Category hierarchy management
* Order management panel
* Dynamic configuration (featured product, shipping fee)
* Drag-and-drop image sorting

### Authentication & Authorization

* NextAuth with Google Provider
* MongoDBAdapter for persistent sessions
* Custom admin guard (`isAdminRequest`)
* Demo mode for safe public viewing


#  Admin Panel Runs in DEMO MODE

Because this repository is public, the admin panel ships **with restricted demo-mode authorization**.

You can enable full admin functionality as follows.



#  Enabling Full Admin Features (Production Mode)

## 1. Disable Demo Mode

In `admin/.env`:

```
DEMO_MODE=false
NEXT_PUBLIC_DEMO_MODE=false
```

## 2. Configure Google OAuth

Create credentials at:

[https://console.cloud.google.com/apis/credentials](https://console.cloud.google.com/apis/credentials)

Add to `admin/.env`:

```
GOOGLE_ID=your_google_client_id
GOOGLE_SECRET=your_google_secret
NEXTAUTH_URL=http://localhost:3001
```

This enables real login + session validation.

## 3. Seed an Admin User in MongoDB

```
{
  "email": "your-email@example.com",
  "role": "admin"
}
```

Without this, admin routes will stay locked.



##  Stripe Integration

* Checkout session creation
* Quantity-based line items
* Shipping fee added dynamically
* Prefetch order before payment
* Payment confirmation stored on success


##  AWS S3 Integration

Admin panel supports:

* Multi-image upload
* Automatic MIME detection
* Reordering images in UI


##  Docker Support

Run everything (MongoDB, front, admin) with:

```
docker compose up --build
```

Services:

| Service         | URL                                            |
| --------------- | ---------------------------------------------- |
| Frontend        | [http://localhost:3000](http://localhost:3000) |
| Admin Dashboard | [http://localhost:3001](http://localhost:3001) |
| MongoDB         | mongodb://mongo:27017/ecommerce                |


##  Automated Testing

Both applications (`front` & `admin`) include Jest tests covering:

* Authentication logic
* Product CRUD
* Order creation & listing
* Cart logic
* Settings API
* Role-based route protection

Testing stack:

* Jest
* mongodb-memory-server
* node-mocks-http
* supertest

All tests pass successfully.


##  Project Structure

```
/electronics-ecommerce
  /admin
  /front
  docker-compose.yml
  README.md
```

Inside each subproject:

```
pages/api       # API routes
models          # Mongoose models
lib             # MongoDB, utilities
tests           # Jest test suites
Dockerfile
.env.example
```


##  Environment Variables

Copy templates:

```
cp admin/.env.example admin/.env
cp front/.env.example front/.env
```

Each file includes all required keys for full functionality (Stripe, MongoDB, NextAuth, S3, etc.).


##  Local Development (without Docker)

### Frontend

```
cd front
npm install
npm run dev
```

### Admin

```
cd admin
npm install
npm run dev
```

MongoDB must be running locally or via Atlas.


##  Running Tests

### Frontend

```
cd front
npm test
```

### Admin

```
cd admin
npm test
```


##  Production Notes

For real deployment, recommended:

* Multi-stage Docker builds
* Reverse proxy (NGINX)
* Managed MongoDB cluster
* CI/CD with automated testing and linting


#  Final Notes (Learning Purpose)

This project was built primarily for **learning, improving full-stack development skills, and demonstrating production-style architecture**.

While the system is fully functional — complete with authentication, payments, admin panel, Docker workflow, and tests — it is still a portfolio project and may require security reviews or hardening before commercial use.

I’m continuously improving the project, and I welcome **constructive feedback, suggestions, or code reviews** from anyone interested. Every comment helps me grow as a developer.


#  Thank You

If you’d like a walkthrough of the application, have feedback, or want to discuss the code architecture, feel free to reach out anytime.


