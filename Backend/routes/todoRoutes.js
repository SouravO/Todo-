import express from 'express';
import {
    getTodos,
    getTodoById,
    createTodo,
    updateTodo,
    deleteTodo
} from '../controllers/todoController.js';

const router = express.Router();

// GET /api/todos - List all todos with pagination
router.get('/', getTodos);

// GET /api/todos/:id - Get single todo
router.get('/:id', getTodoById);

// POST /api/todos - Create new todo
router.post('/', createTodo);

// PUT /api/todos/:id - Update todo
router.put('/:id', updateTodo);

// DELETE /api/todos/:id - Delete todo
router.delete('/:id', deleteTodo);

export default router;
