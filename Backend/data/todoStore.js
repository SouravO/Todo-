// In-memory data store for todos
// Can be easily replaced with MongoDB/Mongoose later

class TodoStore {
    constructor() {
        this.todos = [];
        this.currentId = 1;
    }

    // Get all todos with pagination
    findAll(page = 1, limit = 10, statusFilter = null) {
        // Filter by status if provided
        let filteredTodos = this.todos;
        if (statusFilter) {
            if (statusFilter === 'active') {
                filteredTodos = this.todos.filter(
                    todo => todo.status === 'Pending' || todo.status === 'In-Progress'
                );
            } else if (statusFilter === 'completed') {
                filteredTodos = this.todos.filter(todo => todo.status === 'Completed');
            } else {
                // Specific status filter
                filteredTodos = this.todos.filter(todo => todo.status === statusFilter);
            }
        }

        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;

        // Sort by createdAt descending (newest first)
        const sortedTodos = [...filteredTodos].sort((a, b) =>
            new Date(b.createdAt) - new Date(a.createdAt)
        );

        const items = sortedTodos.slice(startIndex, endIndex);
        const total = filteredTodos.length;
        const totalPages = Math.ceil(total / limit);

        return {
            items,
            total,
            page: parseInt(page),
            limit: parseInt(limit),
            totalPages
        };
    }

    // Find todo by ID
    findById(id) {
        return this.todos.find(todo => todo.id === id);
    }

    // Create new todo
    create(todoData) {
        const newTodo = {
            id: String(this.currentId++),
            title: todoData.title,
            description: todoData.description || '',
            status: todoData.status || 'Pending',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        this.todos.push(newTodo);
        return newTodo;
    }

    // Update existing todo
    update(id, updateData) {
        const index = this.todos.findIndex(todo => todo.id === id);

        if (index === -1) {
            return null;
        }

        const updatedTodo = {
            ...this.todos[index],
            ...updateData,
            updatedAt: new Date().toISOString()
        };

        this.todos[index] = updatedTodo;
        return updatedTodo;
    }

    // Delete todo
    delete(id) {
        const index = this.todos.findIndex(todo => todo.id === id);

        if (index === -1) {
            return false;
        }

        this.todos.splice(index, 1);
        return true;
    }
}

// Export singleton instance
export default new TodoStore();
