import React from "react";
import "./TaskManager.css";

function TaskForm({ input, setInput, editId, addTask, updateTask }) {
  const handleSubmit = () => {
    if (!input || input.trim() === "") return; // prevent empty task
    if (editId) {
      updateTask(editId, input.trim());
    } else {
      addTask(input.trim());
    }
    setInput("");
  };

  return (
    <div className="form-container">
      <input
        className="task-input"
        value={input || ""}       
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter task..."
      />
      <button className="add-btn" onClick={handleSubmit}>
        {editId ? "Update" : "Add"}
      </button>
    </div>
  );
}

export default TaskForm;
