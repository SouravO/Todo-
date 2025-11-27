import { useState } from "react";

const STATUS_OPTIONS = ["Pending", "In-Progress", "Completed"];

// Status badge colors
const STATUS_COLORS = {
  Pending: "bg-yellow-100 text-yellow-800",
  "In-Progress": "bg-blue-100 text-blue-800",
  Completed: "bg-green-100 text-green-800",
};

/**
 * TodoItem component to display a single todo with actions
 */
export default function TodoItem({
  todo,
  onEdit,
  onDelete,
  onStatusChange,
  isLoading,
}) {
  const [isChangingStatus, setIsChangingStatus] = useState(false);

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Handle status change
  const handleStatusChange = async (newStatus) => {
    setIsChangingStatus(true);
    await onStatusChange(todo.id, newStatus);
    setIsChangingStatus(false);
  };

  // Handle delete with confirmation
  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${todo.title}"?`)) {
      onDelete(todo.id);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800 mb-1">
            {todo.title}
          </h3>
          {todo.description && (
            <p className="text-gray-600 text-sm mb-2">{todo.description}</p>
          )}
          <p className="text-xs text-gray-500">
            Created: {formatDate(todo.createdAt)}
          </p>
        </div>

        <div className="flex gap-2 ml-4">
          <button
            onClick={() => onEdit(todo)}
            disabled={isLoading}
            className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Edit todo"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            disabled={isLoading}
            className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Delete todo"
          >
            Delete
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-gray-700">Status:</label>
        <select
          value={todo.status}
          onChange={(e) => handleStatusChange(e.target.value)}
          disabled={isLoading || isChangingStatus}
          className={`px-2 py-1 text-sm rounded-full font-medium ${
            STATUS_COLORS[todo.status]
          } border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {STATUS_OPTIONS.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
        {isChangingStatus && (
          <span className="text-xs text-gray-500">Updating...</span>
        )}
      </div>
    </div>
  );
}
