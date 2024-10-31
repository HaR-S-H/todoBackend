import Todo from "../models/todo.models.js";

const createTodo = async(req, res) => {
    const { text,completed } = req.body;
    const todo = new Todo({
        text,
        completed   
    })
    await todo.save().then(() => {
        res.status(201).json({ message: "todo saved successfully" });
    }).catch(err => {
        res.status(400).json({ message: "error occuring todo creation" });
    });

}

const getTodos = async (req,res) => { 
    try {
        const todos = await Todo.find();
        res.status(200).json({ message: "todo fetched successfully", todos });
    } catch (error) {
        res.status(404).json({message: "Error occuring in todo fetching"});
    }
}

const updateTodos = async (req, res) => { 
    try {
        const { id } = req.params;
        const updateTodo = await Todo.findByIdAndUpdate(id, req.body, {
            new: true
        });
        res.status(200).json({ message: "todo updated successfully", updateTodo });
        
    } catch (error) {
        res.status(400).json({message:"Error occuring in todo updating"})
    }
}

const deleteTodos = async (req, res) => {
    try {
        const deleteTodo = await Todo.findByIdAndDelete(req.params.id, {
            new: true
        })
        if (!deleteTodo) {
            return res.status(404).json({ message: "todo not found" });  // Return 404 if todo not found.
        }
        res.status(200).json({ message: "todo deleted successfully", deleteTodo });
    } catch (error) {
        res.status(400).json({ message: "Error occuring in todo deletion" });
    }
    
}
export { createTodo, getTodos,updateTodos,deleteTodos };