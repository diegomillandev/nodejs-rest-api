# NodeJS REST API

A REST API built with Node.js, Express, and MongoDB for user management, JWT authentication, and post management. It includes data validation with Zod and Swagger documentation generated with swagger-jsdoc.

---

## Technologies Used

- Node.js (ES Modules)
- Express 5
- MongoDB with Mongoose
- JWT for authentication
- bcrypt for password hashing
- Zod for data validation
- Swagger for API documentation
- Morgan for request logging
- Cors for CORS policy handling
- Dotenv for environment variables
- Nodemon for development

---

## Available Scripts

```bash
npm run dev       # Run the server in development mode with nodemon
npm run dev:api   # Run the server with --api flag for Swagger docs
```

---

## API Structure

### Auth

- `POST /auth/register` - User registration  
  Validates with Zod, checks if user exists, saves user with hashed password.

- `POST /auth/login` - User login  
  Validates with Zod, checks credentials, generates JWT token, and stores it in whitelist.

- `GET /auth/profile` - Get authenticated user profile  
  Requires a valid token in the whitelist.

- `GET /auth/logout` - Logout  
  Removes JWT token from the whitelist.

### Posts

_All endpoints require a valid JWT token and authorization._

- `POST /posts` - Create a post  
  Validates input, assigns post to authenticated user.

- `GET /posts` - List posts of the authenticated user.

- `GET /posts/:id` - Get post by ID (only your own).

- `PUT /posts/:id` - Update post by ID (only your own).

- `DELETE /posts/:id` - Delete post by ID (only your own).

---

## Security and Authentication

- JWT with secret signature (`JWT_SECRET` in `.env`)
- Tokens are stored in a `Token` collection for whitelist and session control
- Middleware `validateTokenInWhitelist` and `verifyAuthToken` to validate tokens and users
- Protected with `bearerAuth` scheme in Swagger

---

## Environment Variables (`.env` file)

```env
PORT=3000
MONGODB_URI=mongodb+srv://your_user:your_password@cluster.mongodb.net/your_db
JWT_SECRET=your_jwt_secret
JWT_EXPIRATION=1d
FRONTEND_URL=http://localhost:5173
```

**Examples:**

- `JWT_SECRET=supersecretkey123`
- `JWT_EXPIRATION=7d` (7 days)
- `FRONTEND_URL=https://yourfrontend.com`

---

## Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/nodejs-rest-api.git
cd nodejs-rest-api
```

2. Install dependencies

```bash
npm install
```

3. Set up your `.env` file with the required variables (see above)

4. Run in development mode

```bash
npm run dev
```

5. (Optional) To run with Swagger docs enabled for Postman or Insomnia:

```bash
npm run dev:api
```

---

## Swagger Documentation

Available at: `http://localhost:3000/api-docs` (if enabled in your `index.js`)

---

## Models

### User

- email: String, required, unique
- password: String, required (hashed)
- Other fields as needed

### Post

- title: String, required
- content: String, required
- status: Enum ["draft", "published"], default: "published"
- userId: ObjectId referencing User
- timestamps: automatic `createdAt`, `updatedAt`

---

## Validations

Zod schemas are used to validate input for registration, login, and posts.

---

## Relevant Middleware

- `validateTokenInWhitelist`: Verifies that the JWT token is active and not revoked.
- `verifyAuthToken`: Decodes token, retrieves user, and attaches it to `req.user`.
- `validatePost`: Verifies the existence and ownership of a post by ID.

---

## Author

Diego Millan — [GitHub](https://github.com/diegomillandev) · [LinkedIn](https://www.linkedin.com/in/diegomillandev/)

---

## License

ISC
