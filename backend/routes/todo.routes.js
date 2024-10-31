import express from "express";
import { createTodo,getTodos,updateTodos,deleteTodos } from "../controllers/todo.controllers.js";
const router = express.Router();
router.post("/create", createTodo);
router.get("/fetch", getTodos);
router.put("/update/:id",updateTodos);
router.delete("/delete/:id",deleteTodos);

export default router;
