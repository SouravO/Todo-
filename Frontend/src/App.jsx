import { useState } from "react";
import { useTodos } from "./hooks/useTodos";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import Modal from "./components/Modal";

function App() {
  const [activeTab, setActiveTab] = useState('active'); // 'active' or 'completed'
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');

  // Separate hooks for active and completed todos
  const activeTodos = useTodos('active', searchQuery, sortBy, sortOrder);
  const completedTodos = useTodos('completed', searchQuery, sortBy, sortOrder);

  // Use the appropriate hook based on active tab
  const currentTodos = activeTab === 'active' ? activeTodos : completedTodos;
  
  const {
    todos,
    loading,
    error,
    page,
    totalPages,
    total,
    createTodo,
    updateTodo,
    deleteTodo,
    goToNextPage,
    goToPreviousPage,
  } = currentTodos;

  // Handle create new todo
  const handleCreateClick = () => {
    setEditingTodo(null);
    setIsModalOpen(true);
  };

  // Handle edit todo
  const handleEditTodo = (todo) => {
    setEditingTodo(todo);
    setIsModalOpen(true);
  };

  // Handle form submit (create or update)
  const handleFormSubmit = async (formData) => {
    setIsSubmitting(true);

    let result;
    if (editingTodo) {
      result = await updateTodo(editingTodo.id, formData);
    } else {
      result = await createTodo(formData);
    }

    setIsSubmitting(false);

    if (result.success) {
      setIsModalOpen(false);
      setEditingTodo(null);
    }
  };

  // Handle status change
  const handleStatusChange = async (id, newStatus) => {
    await updateTodo(id, { status: newStatus });
    // Refresh both tabs to reflect the change
    activeTodos.refreshTodos();
    completedTodos.refreshTodos();
  };

  // Handle delete
  const handleDeleteTodo = async (id) => {
    await deleteTodo(id);
  };

  // Close modal
  const handleCloseModal = () => {
    if (!isSubmitting) {
      setIsModalOpen(false);
      setEditingTodo(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-8 px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Todo List Application
          </h1>
          <p className="text-gray-600">
            Manage your tasks efficiently with this simple todo app
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex">
              <svg
                className="h-5 w-5 text-red-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error</h3>
                <p className="text-sm text-red-700 mt-1">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Toolbar: Create Button, Search, Sort, Filter */}
        <div className="mb-6 space-y-4">
          <div className="flex flex-wrap gap-4 items-center">
            <button
              onClick={handleCreateClick}
              disabled={loading}
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              + Create New Todo
            </button>

            {/* Search Bar */}
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search todos..."
                  className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <svg
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            {/* Sort Options */}
            <div className="flex gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="createdAt">Created Date</option>
                <option value="updatedAt">Updated Date</option>
                <option value="title">Title</option>
                <option value="status">Status</option>
              </select>

              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                title={sortOrder === 'asc' ? 'Ascending' : 'Descending'}
              >
                {sortOrder === 'asc' ? (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="flex gap-8">
            <button
              onClick={() => setActiveTab('active')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'active'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Active Tasks
              {activeTodos.total > 0 && (
                <span className="ml-2 bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs">
                  {activeTodos.total}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'completed'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Completed Tasks
              {completedTodos.total > 0 && (
                <span className="ml-2 bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs">
                  {completedTodos.total}
                </span>
              )}
            </button>
          </nav>
        </div>

        {/* Todo List */}
        <TodoList
          todos={todos}
          loading={loading}
          onEdit={handleEditTodo}
          onDelete={handleDeleteTodo}
          onStatusChange={handleStatusChange}
          page={page}
          totalPages={totalPages}
          total={total}
          onNextPage={goToNextPage}
          onPreviousPage={goToPreviousPage}
        />

        {/* Create/Edit Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title={editingTodo ? "Edit Todo" : "Create New Todo"}
        >
          <TodoForm
            todo={editingTodo}
            onSubmit={handleFormSubmit}
            onCancel={handleCloseModal}
            isLoading={isSubmitting}
          />
        </Modal>
      </div>
    </div>
  );
}

export default App;
