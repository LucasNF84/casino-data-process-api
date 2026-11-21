# Authentication Module Documentation

## Overview
JWT-based authentication system with registration code validation.

## Endpoints

### POST /auth/register
Register a new user with validation code.

**Request Body:**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "SecurePass123!",
  "registrationCode": "Casino777"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": 1,
      "username": "johndoe",
      "email": "john@example.com",
      "isActive": true
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Responses:**
- **400** - Invalid registration code
- **409** - User already exists

---

### POST /auth/login
Authenticate and receive JWT token.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": 1,
      "username": "johndoe",
      "email": "john@example.com",
      "isActive": true
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Responses:**
- **401** - Invalid credentials
- **403** - Account inactive

---

### GET /auth/me
Get current authenticated user information.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "User retrieved successfully",
  "data": {
    "id": 1,
    "username": "johndoe",
    "email": "john@example.com",
    "isActive": true,
    "createdAt": "2025-12-02T16:30:00.000Z"
  }
}
```

**Error Responses:**
- **401** - No token provided / Invalid token

## Protected Routes

To protect any route, use the `authMiddleware`:

```javascript
const authMiddleware = require('../../middleware/authMiddleware');

router.get('/protected-route', authMiddleware, controller.method);
```

## Environment Variables

```env
JWT_SECRET=your-super-secret-jwt-key-min-32-characters
JWT_EXPIRES_IN=24h
REGISTRATION_CODE=Casino777
```

## Security Notes

- Passwords are hashed using bcrypt (10 salt rounds)
- JWT tokens expire after configured time (default: 24h)
- Registration requires valid code to prevent unauthorized signups
- Tokens must be sent in `Authorization: Bearer <token>` header
