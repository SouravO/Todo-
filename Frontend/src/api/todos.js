// API client for todos
// Using Vite proxy - requests to /api are forwarded to http://localhost:5000/api
const API_BASE_URL = '/api';

// Helper function to handle API responses
const handleResponse = async (response) => {
    if (!response.ok) {
        const error = await response.json().catch(() => ({
            error: 'Request failed'
        }));
        throw new Error(error.error || error.errors?.join(', ') || 'Request failed');
    }

    // Handle 204 No Content
    if (response.status === 204) {
        return null;
    }

    return response.json();
};

// Get all todos with pagination
export const getTodos = async ({ page = 1, limit = 10, status = null } = {}) => {
    let url = `${API_BASE_URL}/todos?page=${page}&limit=${limit}`;
    if (status) {
        url += `&status=${status}`;
    }
    const response = await fetch(url);
    return handleResponse(response);
};

// Get single todo by ID
export const getTodoById = async (id) => {
    const response = await fetch(`${API_BASE_URL}/todos/${id}`);
    return handleResponse(response);
};

// Create new todo
export const createTodo = async (todoData) => {
    const response = await fetch(`${API_BASE_URL}/todos`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(todoData),
    });
    return handleResponse(response);
};

// Update existing todo
export const updateTodo = async (id, todoData) => {
    const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(todoData),
    });
    return handleResponse(response);
};

// Delete todo
export const deleteTodo = async (id) => {
    const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
        method: 'DELETE',
    });
    return handleResponse(response);
};
