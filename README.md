[![CI de nuestra app](https://github.com/IQuinteros/taller-ejercicio-envivo/actions/workflows/ci.yml/badge.svg)](https://github.com/IQuinteros/taller-ejercicio-envivo/actions/workflows/ci.yml)

# taller-cicd-example

A simple TODO REST API built with Express.js, featuring comprehensive unit tests and CI/CD automation.

## Features

- **RESTful API** for managing TODO items
- **In-memory storage** (data resets on server restart)
- **Comprehensive unit tests** using Jest and Supertest
- **CI/CD pipeline** with GitHub Actions

## Installation

```bash
npm install
```

## Usage

### Start the server

```bash
npm start
```

The server will start on port 3000 (or the port specified in the `PORT` environment variable).

### Run tests

```bash
npm test
```

## API Endpoints

### Get all todos
```
GET /todos
```

### Get a specific todo
```
GET /todos/:id
```

### Create a new todo
```
POST /todos
Content-Type: application/json

{
  "title": "Buy groceries",
  "completed": false
}
```

### Update a todo
```
PUT /todos/:id
Content-Type: application/json

{
  "title": "Buy groceries and cook",
  "completed": true
}
```

### Delete a todo
```
DELETE /todos/:id
```

## Example Usage

```bash
# Create a todo
curl -X POST http://localhost:3000/todos \
  -H "Content-Type: application/json" \
  -d '{"title": "Learn Express.js"}'

# Get all todos
curl http://localhost:3000/todos

# Update a todo (replace :id with actual id)
curl -X PUT http://localhost:3000/todos/1 \
  -H "Content-Type: application/json" \
  -d '{"completed": true}'

# Delete a todo (replace :id with actual id)
curl -X DELETE http://localhost:3000/todos/1
```

## CI/CD

This project uses GitHub Actions for continuous integration. Tests are automatically run on:
- Push to main, master, or develop branches
- Pull requests to main, master, or develop branches

The workflow tests against Node.js versions 18.x and 20.x.
