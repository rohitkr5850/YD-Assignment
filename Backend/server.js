const express = require("express");
const todoRoutes = require("./routes/todoRoutes");

const app = express();


// Middleware for parsing JSON data
app.use(express.json());


// Use the todo routes
app.use("/todos", todoRoutes);


// Default route
app.get("/", (req,res) => {
    res.send("Welcome to my TODO CRUD API");
})

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});