# Quick Start Guide

## 🚀 Getting Started in 3 Steps

### Step 1: Install Dependencies

Open a terminal in the project root and run:

```bash
npm run install:all
```

This will install dependencies for both frontend and backend.

### Step 2: Start the Backend Server

Open a terminal and run:

```bash
cd Backend
npm start
```

You should see:

```
Todo API server running on http://localhost:5000
Health check: http://localhost:5000/api/health
```

### Step 3: Start the Frontend Server

Open a **new terminal** and run:

```bash
cd Frontend
npm run dev
```

You should see:

```
VITE ready in XXXms
Local: http://localhost:5173/
```

### Step 4: Open the Application

Open your browser and navigate to:

```
http://localhost:5173/
```

(or the port shown in your terminal)

## ✅ You're Ready!

You should now see the Todo List Application running with:

- A "Create New Todo" button at the top
- An empty state if no todos exist
- Fully functional create, edit, delete, and status change operations

## 🔧 Troubleshooting

### Port Already in Use

If you get a port conflict error, the application will automatically try another port.

### Cannot Connect to Backend

Make sure:

1. Backend server is running on port 5000
2. Frontend proxy is configured in `vite.config.js`
3. No firewall is blocking localhost connections

### CORS Errors

The backend already has CORS enabled. If you still see errors:

1. Restart both servers
2. Clear browser cache
3. Check that backend is running on http://localhost:5000

## 🎯 Testing the Application

1. **Create a Todo**: Click "Create New Todo" button
2. **Fill the Form**: Enter title (required), description (optional), and status
3. **View Todos**: See your todo in the list
4. **Edit Todo**: Click "Edit" button on any todo
5. **Change Status**: Use the dropdown on each todo card
6. **Delete Todo**: Click "Delete" and confirm
7. **Test Pagination**: Create 10+ todos to see pagination controls

## 📝 API Testing

Test the backend API directly:

```bash
# Health check
curl http://localhost:5000/api/health

# Get all todos
curl http://localhost:5000/api/todos

# Create a todo
curl -X POST http://localhost:5000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Todo","status":"Pending"}'
```

## 🎨 Making Changes

### Frontend Changes

- Edit files in `Frontend/src/`
- Changes hot-reload automatically
- Check browser console for errors

### Backend Changes

- Edit files in `Backend/`
- Restart server to see changes
- Or use `npm run dev` for auto-reload

## 🛠️ Development Scripts

From project root:

```bash
npm run server        # Start backend
npm run client        # Start frontend
npm run dev:backend   # Start backend with auto-reload
npm run install:all   # Install all dependencies
```

## Next Steps

- Read the main README.md for detailed documentation
- Explore the code structure
- Try adding new features
- Consider migrating to MongoDB for persistence

Enjoy building with your Todo App! 🎉
