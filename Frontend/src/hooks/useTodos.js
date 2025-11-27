import { useState, useEffect, useCallback } from 'react';
import * as todoApi from '../api/todos';

/**
 * Custom hook to manage todos state, fetching, pagination, and CRUD operations
 * @param {string} filter - 'active' for pending/in-progress, 'completed' for completed todos
 */
export const useTodos = (filter = 'active') => {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [total, setTotal] = useState(0);
    const limit = 3; // Show 3 items per page

    // Fetch todos from API
    const fetchTodos = useCallback(async (pageNum = page) => {
        setLoading(true);
        setError(null);

        try {
            const data = await todoApi.getTodos({ 
                page: pageNum, 
                limit,
                status: filter // Pass filter to backend
            });
            
            setTodos(data.items);
            setTotalPages(data.totalPages);
            setTotal(data.total);
            setPage(data.page);
        } catch (err) {
            setError(err.message);
            console.error('Error fetching todos:', err);
        } finally {
            setLoading(false);
        }
    }, [page, filter, limit]);

    // Initial fetch
    useEffect(() => {
        fetchTodos(1);
    }, []);

    // Create new todo
    const createTodo = async (todoData) => {
        setError(null);
        try {
            await todoApi.createTodo(todoData);
            // Refresh current page
            await fetchTodos(page);
            return { success: true };
        } catch (err) {
            setError(err.message);
            return { success: false, error: err.message };
        }
    };

    // Update existing todo
    const updateTodo = async (id, todoData) => {
        setError(null);
        try {
            await todoApi.updateTodo(id, todoData);
            // Refresh current page
            await fetchTodos(page);
            return { success: true };
        } catch (err) {
            setError(err.message);
            return { success: false, error: err.message };
        }
    };

    // Delete todo
    const deleteTodo = async (id) => {
        setError(null);
        try {
            await todoApi.deleteTodo(id);

            // If we deleted the last item on a page (and it's not page 1), go to previous page
            if (todos.length === 1 && page > 1) {
                await fetchTodos(page - 1);
            } else {
                await fetchTodos(page);
            }

            return { success: true };
        } catch (err) {
            setError(err.message);
            return { success: false, error: err.message };
        }
    };

    // Pagination handlers
    const goToNextPage = () => {
        if (page < totalPages) {
            fetchTodos(page + 1);
        }
    };

    const goToPreviousPage = () => {
        if (page > 1) {
            fetchTodos(page - 1);
        }
    };

    const goToPage = (pageNum) => {
        if (pageNum >= 1 && pageNum <= totalPages) {
            fetchTodos(pageNum);
        }
    };

    return {
        todos,
        loading,
        error,
        page,
        totalPages,
        total,
        limit,
        createTodo,
        updateTodo,
        deleteTodo,
        goToNextPage,
        goToPreviousPage,
        goToPage,
        refreshTodos: () => fetchTodos(page),
    };
};
