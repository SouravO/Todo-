# Todo List Application

A full-stack Todo List application built with React (Vite + Tailwind CSS) and Express.js.

## Features

✅ **Create, Read, Update, Delete** todos  
✅ **Status Management** - Pending, In-Progress, Completed  
✅ **Pagination** - Navigate through todos efficiently  
✅ **Form Validation** - Client-side validation for required fields  
✅ **Loading States** - Visual feedback during API operations  
✅ **Error Handling** - Graceful error messages  
✅ **Responsive Design** - Built with Tailwind CSS  
✅ **Modern UI** - Clean and intuitive interface

## Tech Stack

### Frontend

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS 4** - Utility-first CSS framework
- **Custom Hooks** - useTodos for state management

### Backend

- **Express.js** - Web framework
- **CORS** - Cross-origin resource sharing
- **In-memory Store** - Data persistence (easily swappable with MongoDB)

## Project Structure

```
todo/
├── Backend/
│   ├── controllers/
│   │   └── todoController.js    # Business logic for todos
│   ├── data/
│   │   └── todoStore.js          # In-memory data store
│   ├── routes/
│   │   └── todoRoutes.js         # API routes
│   ├── server.js                 # Express server setup
│   └── package.json
├── Frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── todos.js          # API client layer
│   │   ├── components/
│   │   │   ├── Modal.jsx         # Reusable modal component
│   │   │   ├── TodoForm.jsx      # Create/Edit form
│   │   │   ├── TodoItem.jsx      # Individual todo display
│   │   │   └── TodoList.jsx      # Todo list with pagination
│   │   ├── hooks/
│   │   │   └── useTodos.js       # Custom hook for todo management
│   │   ├── App.jsx               # Main application component
│   │   ├── main.jsx              # React entry point
│   │   └── index.css             # Global styles
│   ├── vite.config.js            # Vite configuration with proxy
│   └── package.json
└── package.json                   # Root package.json with scripts
```

## Installation

### Option 1: Install All Dependencies at Once

```bash
npm run install:all
```

### Option 2: Install Separately

```bash
# Install backend dependencies
npm run install:backend

# Install frontend dependencies
npm run install:frontend
```

## Running the Application

### Method 1: Run Both Servers Separately (Recommended for Development)

**Terminal 1 - Backend Server:**

```bash
npm run server
```

Backend will run on: http://localhost:5000

**Terminal 2 - Frontend Dev Server:**

```bash
npm run client
```

Frontend will run on: http://localhost:5173

### Method 2: Run Backend with Auto-Reload

```bash
npm run dev:backend
```

## API Endpoints

All endpoints are prefixed with `/api/todos`

### Get All Todos (Paginated)

```http
GET /api/todos?page=1&limit=10
```

**Query Parameters:**

- `page` (number, default: 1) - Page number
- `limit` (number, default: 10) - Items per page

**Response:**

```json
{
  "items": [...],
  "total": 50,
  "page": 1,
  "limit": 10,
  "totalPages": 5
}
```

### Get Single Todo

```http
GET /api/todos/:id
```

### Create Todo

```http
POST /api/todos
Content-Type: application/json

{
  "title": "Learn React",
  "description": "Complete React tutorial",
  "status": "Pending"
}
```

### Update Todo

```http
PUT /api/todos/:id
Content-Type: application/json

{
  "title": "Learn React",
  "description": "Complete advanced React patterns",
  "status": "In-Progress"
}
```

### Delete Todo

```http
DELETE /api/todos/:id
```

## Todo Model

```javascript
{
  id: String,              // Unique identifier
  title: String,           // Required
  description: String,     // Optional
  status: String,          // "Pending" | "In-Progress" | "Completed"
  createdAt: Date,         // ISO 8601 timestamp
  updatedAt: Date          // ISO 8601 timestamp
}
```

## Frontend Architecture

### Custom Hook: `useTodos`

Centralized state management for todos including:

- Fetching paginated todos
- Creating, updating, and deleting todos
- Pagination controls
- Loading and error states

### Components

- **App.jsx** - Main container, orchestrates all components
- **TodoList.jsx** - Displays todos with pagination controls
- **TodoItem.jsx** - Individual todo card with inline status change
- **TodoForm.jsx** - Reusable form for create/edit operations
- **Modal.jsx** - Reusable modal wrapper

### API Client Layer

All API calls are abstracted in `src/api/todos.js` for easy maintenance and testing.

## Development Features

### Loading States

- Skeleton screens while fetching data
- Disabled buttons during operations
- Loading indicators for status changes

### Error Handling

- API error messages displayed to user
- Validation errors shown in forms
- Network error handling

### UX Enhancements

- Confirmation dialog before deletion
- Auto-refresh after CRUD operations
- Smart pagination (handles edge cases like last item deletion)
- ESC key closes modal
- Prevents body scroll when modal is open

## Browser Support

Modern browsers that support ES6+ features:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

Potential improvements (currently using in-memory storage):

- [ ] Add MongoDB/Mongoose for persistence
- [ ] Add user authentication
- [ ] Add filtering and sorting
- [ ] Add search functionality
- [ ] Add due dates and reminders
- [ ] Add tags/categories
- [ ] Add bulk operations
- [ ] Add todo priority levels
- [ ] Add dark mode
- [ ] Add unit and integration tests

## Converting to MongoDB

To switch from in-memory storage to MongoDB:

1. Install Mongoose:

```bash
cd Backend
npm install mongoose
```

2. Replace `data/todoStore.js` with Mongoose model and methods
3. Update `server.js` to connect to MongoDB
4. Keep the same controller interface for seamless integration

## License

MIT

## Support

For issues or questions, please create an issue in the repository.
