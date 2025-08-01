# API Documentation

This document describes the available API endpoints, request methods, sample input/output, authentication requirements, and possible error responses.

---

## Authentication

All endpoints (except `/login` and `/register`) require a valid JWT in the `Authorization` header:


---

## Endpoints

### 1. **Register a New User**

- **Endpoint**: `POST /api/register`
- **Description**: Creates a new user account.
- **Description**: Auth Required: ❌ No
- **Request Body**:

```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "role": "DEV"
}
```

Response:

```json
{
    "status": 201,
    "success": true,
    "message": "User registered successfully",
    "result": {
        "email": "celar22@gmail.com",
        "password": "$2b$10$5a9Ds07y5Gj6pGXeDdaiC.I0vo.lslP20x1XvnswyeBBicl0GJUyC",
        "role": "DEV",
        "salt": "$2b$10$5a9Ds07y5Gj6pGXeDdaiC.",
        "id": "b7707a29-b568-406a-a399-4ca2ca4ce76d"
    }
}
```

Errors:

400 Bad Request: Missing fields or user already exists

```json
{
    "status": 400,
    "success": false,
    "message": "User already exists",
    "result": null
}


{
    "errors": [
        {
            "message": "Role is required"
        },
        {
            "message": "Role must be either DEV or PSP"
        }
    ]
}

```
