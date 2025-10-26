const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "../data/todos.json");

//Helpter to read todos file from JSON file
function readTodo(){
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
}

//Helper to write todo file to JSON file
function writeTodo(todos){
    fs.writeFileSync(filePath, JSON.stringify(todos, null, 2));
}

//GET/todos :- fetch all todos
function getTodos(req,res){
    const todos = readTodo();
    res.status(200).json({success: true, count: todos.length, data: todos});
}

//POST/todos :- create a new todoo
function createTodo(req,res){
    const { title, completed } = req.body;

    if (!title) {
      return res.status(400).json({ success: false, message: "Title is required!" });
    }
  
    const todos = readTodo();
    const newTodo = {
      id: Date.now().toString(),
      title,
      completed: completed || false,
    };
  
    todos.push(newTodo);
    writeTodo(todos);
  
    res.status(201).json({ success: true, message: "Todo created successfully", data: newTodo });
  
}

// PUT/todos/:id - update a todo
function updateTodo(req, res) {
    const { id } = req.params;
    const { title, completed } = req.body;
    const todos = readTodo();
  
    const index = todos.findIndex((t) => t.id === id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: "Todo not found!" });
    }
  
    if (title !== undefined) todos[index].title = title;
    if (completed !== undefined) todos[index].completed = completed;
  
    writeTodo(todos);
    res.status(200).json({ success: true, message: "Todo updated successfully", data: todos[index] });
  }
  
  // DELETE /todos/:id - delete a todo
  function deleteTodo(req, res) {
    const { id } = req.params;
    const todos = readTodo();
  
    const filteredTodos = todos.filter((t) => t.id !== id);
    if (filteredTodos.length === todos.length) {
      return res.status(404).json({ success: false, message: "Todo not found!" });
    }
  
    writeTodo(filteredTodos);
    res.status(200).json({ success: true, message: "Todo deleted successfully" });
  }
  
  module.exports = { getTodos, createTodo, updateTodo, deleteTodo };