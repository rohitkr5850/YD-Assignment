📝 Simple To-Do CRUD API

A simple RESTful API built using Node.js and Express.js to manage To-Do items. It performs all CRUD operations using a local JSON file (no database required).

Features

Create, Read, Update, Delete (CRUD) operations

Local JSON file for data storage

Proper HTTP status codes

Input validation (title required)

Completed status field (true/false)

Tech Stack

Node.js

Express.js

File System (fs module)

Folder Structure

todo-backend/
│
├── server.js
├── routes/
│ └── todoRoutes.js
├── controllers/
│ └── todoController.js
├── data/
│ └── todos.json
└── README.md

Setup Instructions

Clone the repository:

git clone https://github.com/rohitkr5850/YD-Assignment.git
cd Backend


Install dependencies:

npm install


Start the server:

node server.js


The server runs at: http://localhost:3000

API Endpoints
Method	Endpoint	Description
GET	/todos	Get all todos
POST	/todos	Create a new todo
PUT	/todos/:id	Update an existing todo
DELETE	/todos/:id	Delete a todo
Example API Usage
POST /todos

Request Body:

{
  "title": "Learn Node.js",
  "completed": false
}


Response:

{
  "success": true,
  "message": "Todo created successfully",
  "data": {
    "id": "1698658389273",
    "title": "Learn Node.js",
    "completed": false
  }
}

PUT /todos/:id

Request Body:

{
  "title": "Learn Express.js",
  "completed": true
}


Response:

{
  "success": true,
  "message": "Todo updated successfully",
  "data": {
    "id": "1698658389273",
    "title": "Learn Express.js",
    "completed": true
  }
}

GET /todos

Response:

[
  {
    "id": "1698658389273",
    "title": "Learn Express.js",
    "completed": true
  }
]

DELETE /todos/:id

Response:

{
  "success": true,
  "message": "Todo deleted successfully"
}

Notes

Make sure to use Postman or Thunder Client to test POST, PUT, and DELETE requests.

The todos.json file in the data/ folder is used for storing all todos.

Project by Rohit Kumar