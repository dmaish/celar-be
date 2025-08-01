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

- **Response:**:

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


### 2. **Login  User**

- **Endpoint**: `POST /api/login`
- **Description**: Authenticates user and returns a JWT.
- **Description**: Auth Required: ❌ No
- **Request Body**:

```json
{
  "email": "celar@gmail.com",
  "password": "254Password!"
}

```

- **Response:**:

```json
{
    "status": 200,
    "success": true,
    "message": "Login successful",
    "result": {
        "id": "a1c687e7-45d7-4f6c-9383-cfe4039e1758",
        "email": "celar@gmail.com",
        "role": "DEV",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImExYzY4N2U3LTQ1ZDctNGY2Yy05MzgzLWNmZTQwMzllMTc1OCIsImVtYWlsIjoiY2VsYXJAZ21haWwuY29tIiwicm9sZSI6IkRFViIsImlhdCI6MTc1NDA0MTg2OX0.of7lSHVqJvB3xLEzpVlUgzSgyNmo6PG5-W3FeRO0ISM"
    }
}
```

Errors:

400 Bad Request: Missing fields or Invalid credentials

```json
{
    "status": 401,
    "success": false,
    "message": "Provided credentials arent not valid",
    "result": null
}

{
    "status": 401,
    "success": false,
    "message": "No user matches provided email",
    "result": null
}

{
    "errors": [
        {
            "message": "Email is required"
        },
    ]
}
```


### 3. **Fetch Users**

- **Endpoint**: `GET /api/users`
- **Description**: Gets all users - utilised in selecting transactions recipient.
- **Description**: Auth Required: ✅ Yes
- **Request Body**:

```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "role": "DEV"
}
```

- **Response:**:

```json
{
    "status": 200,
    "success": true,
    "message": "Users fetched successfully",
    "result": [
        {
            "id": "22426d91-f4a4-4f9e-b646-5d17972532f2",
            "email": "mainadaniel@gmail.com"
        },
        {
            "id": "53e3c722-524f-467a-b1b5-90345565d19a",
            "email": "danieldeveloperemail@gmail.com"
        },
        {
            "id": "7ec5eb6c-d203-488e-9a4d-f1b3126e6c11",
            "email": "developeremail@gmail.com"
        }
    ]
}

```

### 4. **Fetch Transactions**

- **Endpoint**: `GET /api/transactions`
- **Description**: Gets all transactions related [as recipient or sender] to user
- **Description**: Auth Required: ✅ Yes
- **Request Body**:


- **Response:**:

```json
{
    "status": 200,
    "success": true,
    "message": "Transactions fetched successfully",
    "result": [
        {
            "id": "43f05684-5288-4fe8-967b-0ad34ffcc078",
            "amount": 1000,
            "currency": "KES",
            "timestamp": "2025-07-30T20:56:02.328Z",
            "sender": {
                "id": "a1c687e7-45d7-4f6c-9383-cfe4039e1758",
                "email": "celar@gmail.com",
                "role": "DEV"
            },
            "recipient": {
                "id": "e1805284-1c86-474b-b9f9-9d4a95bf1f8a",
                "email": "dev@example.com",
                "role": "DEV"
            }
        },
        {
            "id": "9c7e9110-7363-44d2-a1bc-33683e93cece",
            "amount": 1000,
            "currency": "KES",
            "timestamp": "2025-07-30T20:35:02.985Z",
            "sender": {
                "id": "a1c687e7-45d7-4f6c-9383-cfe4039e1758",
                "email": "celar@gmail.com",
                "role": "DEV"
            },
            "recipient": {
                "id": "e1805284-1c86-474b-b9f9-9d4a95bf1f8a",
                "email": "dev@example.com",
                "role": "DEV"
            }
        },
        {
            "id": "bbf81336-8a94-454c-9c68-ac4bf1b8d8de",
            "amount": 1000,
            "currency": "KES",
            "timestamp": "2025-07-30T16:34:16.813Z",
            "sender": {
                "id": "a1c687e7-45d7-4f6c-9383-cfe4039e1758",
                "email": "celar@gmail.com",
                "role": "DEV"
            },
            "recipient": {
                "id": "7ec3d83c-0e96-431a-a7aa-4c87010b1431",
                "email": "psp@example.com",
                "role": "PSP"
            }
        }
    ]
}
```


### 5. **Send Transaction**

- **Endpoint**: `POST /api/send`
- **Description**: Makes a transaction to a recipient within the app.
- **Description**: Auth Required: ✅ Yes
- **Request Body**:

```json
{
    "recipientId": "02c60ad9-a3f4-4e41-9ace-780a0eefa664",
    "amount": 5999,
    "currency": "KES"
}
```

- **Response:**:

```json
{
    "status": 201,
    "success": true,
    "message": "Transaction made successfully",
    "result": {
        "amount": 5999,
        "currency": "KES",
        "sender": {
            "id": "a1c687e7-45d7-4f6c-9383-cfe4039e1758",
            "email": "celar@gmail.com",
            "role": "DEV"
        },
        "recipient": {
            "id": "02c60ad9-a3f4-4e41-9ace-780a0eefa664",
            "email": "mosigisixob@gmail.com",
            "role": "PSP"
        },
        "id": "6a04762b-f026-416b-887c-e4746604e586",
        "timestamp": "2025-08-01T09:54:22.569Z"
    }
}
```

Errors:

400 Bad Request: Missing fields 

```json
{
    "errors": [
        {
            "message": "Recipient ID is required"
        },
        {
            "message": "Recipient ID must be a UUID"
        },
        {
            "message": "Amount is required"
        },
        {
            "message": "Amount must be a positive number"
        },
        {
            "message": "Currency is required"
        },
        {
            "message": "Currency must be either KES or USD"
        }
    ]
}
```

### NB: For all endpoints requiring authentication, the below are the errors to be expected regarding an authentication token**

```json
{
    "success": false,
    "error": "Please provide a token"
}

{
    "success": false,
    "error": "Token is not valid"
}

```

