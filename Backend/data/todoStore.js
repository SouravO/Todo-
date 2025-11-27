// In-memory data store for todos
// Can be easily replaced with MongoDB/Mongoose later

class TodoStore {
    constructor() {
        this.todos = [];
        this.currentId = 1;
    }

    // Get all todos with pagination, filtering, search, and sorting
    findAll(page = 1, limit = 10, statusFilter = null, searchQuery = null, sortBy = 'createdAt', sortOrder = 'desc') {
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

        // Search by title or description
        if (searchQuery && searchQuery.trim() !== '') {
            const query = searchQuery.toLowerCase();
            filteredTodos = filteredTodos.filter(todo => 
                todo.title.toLowerCase().includes(query) ||
                (todo.description && todo.description.toLowerCase().includes(query))
            );
        }

        // Sort todos
        const sortedTodos = [...filteredTodos].sort((a, b) => {
            let aValue, bValue;

            switch (sortBy) {
                case 'title':
                    aValue = a.title.toLowerCase();
                    bValue = b.title.toLowerCase();
                    break;
                case 'status':
                    // Custom sort order: Pending -> In-Progress -> Completed
                    const statusOrder = { 'Pending': 1, 'In-Progress': 2, 'Completed': 3 };
                    aValue = statusOrder[a.status];
                    bValue = statusOrder[b.status];
                    break;
                case 'updatedAt':
                    aValue = new Date(a.updatedAt);
                    bValue = new Date(b.updatedAt);
                    break;
                case 'createdAt':
                default:
                    aValue = new Date(a.createdAt);
                    bValue = new Date(b.createdAt);
                    break;
            }

            if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });

        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
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
