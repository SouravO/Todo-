import todoStore from '../data/todoStore.js';

// Valid status values
const VALID_STATUSES = ['Pending', 'In-Progress', 'Completed'];

// Validation helper
const validateTodo = (data, isUpdate = false) => {
    const errors = [];

    if (!isUpdate || data.title !== undefined) {
        if (!data.title || typeof data.title !== 'string' || data.title.trim() === '') {
            errors.push('Title is required and must be a non-empty string');
        }
    }

    if (data.status && !VALID_STATUSES.includes(data.status)) {
        errors.push(`Status must be one of: ${VALID_STATUSES.join(', ')}`);
    }

    return errors;
};

// Get all todos with pagination
export const getTodos = (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const status = req.query.status; // Optional status filter

        if (page < 1 || limit < 1) {
            return res.status(400).json({
                error: 'Page and limit must be positive numbers'
            });
        }

        const result = todoStore.findAll(page, limit, status);
        res.json(result);
    } catch (error) {
        console.error('Error getting todos:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get single todo by ID
export const getTodoById = (req, res) => {
    try {
        const { id } = req.params;
        const todo = todoStore.findById(id);

        if (!todo) {
            return res.status(404).json({ error: 'Todo not found' });
        }

        res.json(todo);
    } catch (error) {
        console.error('Error getting todo:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Create new todo
export const createTodo = (req, res) => {
    try {
        const errors = validateTodo(req.body);

        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }

        const newTodo = todoStore.create(req.body);
        res.status(201).json(newTodo);
    } catch (error) {
        console.error('Error creating todo:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Update todo
export const updateTodo = (req, res) => {
    try {
        const { id } = req.params;
        const errors = validateTodo(req.body, true);

        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }

        const updatedTodo = todoStore.update(id, req.body);

        if (!updatedTodo) {
            return res.status(404).json({ error: 'Todo not found' });
        }

        res.json(updatedTodo);
    } catch (error) {
        console.error('Error updating todo:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Delete todo
export const deleteTodo = (req, res) => {
    try {
        const { id } = req.params;
        const deleted = todoStore.delete(id);

        if (!deleted) {
            return res.status(404).json({ error: 'Todo not found' });
        }

        res.status(204).send();
    } catch (error) {
        console.error('Error deleting todo:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
