import React from "react";
import "./TaskManager.css";

function TaskList({ tasks, setInput, setEditId, deleteTask, toggleComplete }) {
  return (
    <div className="task-container">
      <table className="task-table">
        <thead>
          <tr>
            <th>Done ✅</th>
            <th>Task</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((t) => (
            <tr key={t.id} className={t.completed ? "completed" : ""}>
              <td>
                <input
                  type="checkbox"
                  checked={t.completed}
                  onChange={() => toggleComplete(t.id)}
                />
              </td>
              <td>{t.title}</td>
              <td>
                <button
                  className="edit-btn"
                  onClick={() => {
                    setInput(t.title);
                    setEditId(t.id);
                  }}
                >
                  ✏️ Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => deleteTask(t.id)}
                >
                  ❌ Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TaskList;

