import React, { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import "./components/TaskManager.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [editId, setEditId] = useState(null);
  const [input, setInput] = useState("");

  // Load tasks from backend
  useEffect(() => {
    fetch("http://localhost:5000/tasks")
      .then((res) => res.json())
      .then(setTasks);
  }, []);

  // Add new task
  const addTask = async (title) => {
    const res = await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, completed: false }),
    });
    const data = await res.json();
    setTasks([...tasks, data]);
  };

  // Update task
  const updateTask = async (id, title) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
    const data = await res.json();
    setTasks(tasks.map((t) => (t.id === id ? data : t)));
    setEditId(null);
  };

  // Delete task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, { method: "DELETE" });
    setTasks(tasks.filter((t) => t.id !== id));
  };

  // Toggle complete checkbox
  const toggleComplete = (id) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  // Progress calculation
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const progressPercent = totalTasks
    ? Math.round((completedTasks / totalTasks) * 100)
    : 0;

  return (
    <div className="app-container">
      <h1 className="app-header">📝 To-Do Manager</h1>
      <p className="app-sub">
        {completedTasks}/{totalTasks} tasks completed
      </p>

      {/* Progress Bar */}
      <div className="progress-bar-container">
        <div
          className="progress-bar"
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>

      {/* Task Form */}
      <TaskForm
        input={input}
        setInput={setInput}
        editId={editId}
        addTask={addTask}
        updateTask={updateTask}
      />

      {/* Task List */}
      <TaskList
        tasks={tasks}
        setInput={setInput}
        setEditId={setEditId}
        deleteTask={deleteTask}
        toggleComplete={toggleComplete}
      />
    </div>
  );
}

export default App;
