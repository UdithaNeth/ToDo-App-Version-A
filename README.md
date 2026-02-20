# ToDo-App-Version-A

MTIT assignment Todo app Version A

A full-stack Todo application built with Node.js, Express, MongoDB, and React.

## Features

- Create, read, update, and delete todos
- Mark todos as completed
- Set priority levels (low, medium, high)
- Responsive React frontend
- RESTful API with proper error handling
- MongoDB for data persistence

## Project Structure

```
ToDo-App-Version-A/
├── backend/
│   ├── controllers/
│   │   └── todoController.js
│   ├── middleware/
│   │   └── errorHandler.js
│   ├── models/
│   │   └── Todo.js
│   ├── routes/
│   │   └── todoRoutes.js
│   ├── .env
│   ├── package.json
│   ├── server.js
│   └── README.md
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── TodoForm.js
│   │   │   ├── TodoItem.js
│   │   │   └── TodoList.js
│   │   ├── App.css
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── README.md
└── README.md
```

## Backend Setup

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory with the following variables:
   ```
   PORT=5000
   DB_URI=mongodb://localhost:27017/todoapp
   NODE_ENV=development
   ```

4. Start MongoDB service (if running locally)

5. Start the server:
   ```bash
   npm start
   ```
   Or for development with nodemon:
   ```bash
   npm run dev
   ```

The server will run on `http://localhost:5000`

## Frontend Setup

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the frontend directory (optional):
   ```
   REACT_APP_API_BASE_URL=http://localhost:5000/api/todos
   ```

4. Start the development server:
   ```bash
   npm start
   ```

The app will open in your browser at `http://localhost:3000`

## API Documentation

### Overview

This API provides CRUD operations for managing Todo items. All endpoints return responses in a consistent JSON format:

```json
{
  "success": boolean,
  "message": string,
  "data": object | null
}
```

### Base URL

```
http://localhost:5000/api
```

### Endpoints

#### 1. Get All Todos

**GET** `/todos`

Retrieves a list of all todo items.

##### Response

**Status Code:** 200 OK

**Response Body:**
```json
{
  "success": true,
  "message": "Todos retrieved successfully",
  "data": [
    {
      "_id": "60d5ecb74bbb4c001f8b4567",
      "title": "Complete project",
      "description": "Finish the Todo app project",
      "status": false,
      "priority": "high",
      "createdAt": "2023-06-25T10:30:00.000Z"
    }
  ]
}
```

##### Error Response

**Status Code:** 500 Internal Server Error

```json
{
  "success": false,
  "message": "Database connection error",
  "data": null
}
```

#### 2. Create Todo

**POST** `/todos`

Creates a new todo item.

##### Request Body

```json
{
  "title": "Buy groceries",
  "description": "Milk, bread, eggs",
  "priority": "medium"
}
```

**Required Fields:**
- `title` (string): The title of the todo (required, min 3 characters)

**Optional Fields:**
- `description` (string): Additional details about the todo
- `priority` (string): Priority level - "low", "medium", or "high" (defaults to "medium")

##### Response

**Status Code:** 201 Created

**Response Body:**
```json
{
  "success": true,
  "message": "Todo created successfully",
  "data": {
    "_id": "60d5ecb74bbb4c001f8b4569",
    "title": "Buy groceries",
    "description": "Milk, bread, eggs",
    "status": false,
    "priority": "medium",
    "createdAt": "2023-06-25T12:00:00.000Z"
  }
}
```

##### Error Responses

**Status Code:** 400 Bad Request (Validation Error)

```json
{
  "success": false,
  "message": "Todo validation failed: title: Path `title` is required.",
  "data": null
}
```

#### 3. Get Todo by ID

**GET** `/todos/:id`

Retrieves a specific todo item by its ID.

##### Parameters

- `id` (string): The MongoDB ObjectId of the todo item

##### Response

**Status Code:** 200 OK

**Response Body:**
```json
{
  "success": true,
  "message": "Todo retrieved successfully",
  "data": {
    "_id": "60d5ecb74bbb4c001f8b4567",
    "title": "Complete project",
    "description": "Finish the Todo app project",
    "status": false,
    "priority": "high",
    "createdAt": "2023-06-25T10:30:00.000Z"
  }
}
```

##### Error Responses

**Status Code:** 400 Bad Request (Invalid ID)

```json
{
  "success": false,
  "message": "Invalid todo ID",
  "data": null
}
```

**Status Code:** 404 Not Found

```json
{
  "success": false,
  "message": "Todo not found",
  "data": null
}
```

#### 4. Update Todo

**PUT** `/todos/:id`

Updates an existing todo item.

##### Parameters

- `id` (string): The MongoDB ObjectId of the todo item

##### Request Body

```json
{
  "title": "Updated title",
  "status": true
}
```

**Fields:** All fields are optional. Only provided fields will be updated.

##### Response

**Status Code:** 200 OK

**Response Body:**
```json
{
  "success": true,
  "message": "Todo updated successfully",
  "data": {
    "_id": "60d5ecb74bbb4c001f8b4567",
    "title": "Updated title",
    "description": "Finish the Todo app project",
    "status": true,
    "priority": "high",
    "createdAt": "2023-06-25T10:30:00.000Z"
  }
}
```

##### Error Responses

**Status Code:** 400 Bad Request (Invalid ID)

```json
{
  "success": false,
  "message": "Invalid todo ID",
  "data": null
}
```

**Status Code:** 404 Not Found

```json
{
  "success": false,
  "message": "Todo not found",
  "data": null
}
```

#### 5. Delete Todo

**DELETE** `/todos/:id`

Deletes a todo item.

##### Parameters

- `id` (string): The MongoDB ObjectId of the todo item

##### Response

**Status Code:** 200 OK

**Response Body:**
```json
{
  "success": true,
  "message": "Todo deleted successfully",
  "data": null
}
```

##### Error Responses

**Status Code:** 400 Bad Request (Invalid ID)

```json
{
  "success": false,
  "message": "Invalid todo ID",
  "data": null
}
```

**Status Code:** 404 Not Found

```json
{
  "success": false,
  "message": "Todo not found",
  "data": null
}
```

#### 6. Health Check

**GET** `/health`

Checks if the server is running properly.

##### Response

**Status Code:** 200 OK

**Response Body:**
```json
{
  "success": true,
  "message": "Server is healthy",
  "data": {
    "uptime": 123.456
  }
}
```

### Status Codes

- **200 OK**: Request successful
- **201 Created**: Resource created successfully
- **400 Bad Request**: Invalid request data or parameters
- **404 Not Found**: Resource not found
- **500 Internal Server Error**: Server error

### Data Types

#### Todo Object

```json
{
  "_id": "string (MongoDB ObjectId)",
  "title": "string (required, min 3 chars)",
  "description": "string (optional)",
  "status": "boolean (default: false)",
  "priority": "string (enum: 'low', 'medium', 'high', default: 'medium')",
  "createdAt": "string (ISO 8601 date)"
}
```

## Technologies Used

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- dotenv for environment variables
- CORS for cross-origin requests

### Frontend
- React
- Axios for HTTP requests
- CSS for styling

## Development

### Running Tests

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

### Building for Production

```bash
# Backend
cd backend
npm run build

# Frontend
cd frontend
npm run build
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.

## Notes

- All dates are returned in ISO 8601 format
- The `status` field represents completion status (false = pending, true = completed)
- Priority levels are case-sensitive and must be one of: "low", "medium", "high"
- All endpoints require proper JSON content type for requests with bodies
- Error messages may vary based on validation rules and database constraints 
