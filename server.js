import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect SQLite DB
let db;
(async () => {
  db = await open({
    filename: "./tasks.db",
    driver: sqlite3.Database,
  });
  await db.exec(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT
    )
  `);
})();

// Get all tasks
app.get("/tasks", async (req, res) => {
  const tasks = await db.all("SELECT * FROM tasks");
  res.json(tasks);
});

// Add task
app.post("/tasks", async (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: "Title required" });
  const result = await db.run("INSERT INTO tasks (title) VALUES (?)", [title]);
  res.json({ id: result.lastID, title, completed: false });
});

// Update task
app.put("/tasks/:id", async (req, res) => {
  const { title } = req.body;
  await db.run("UPDATE tasks SET title = ? WHERE id = ?", [title, req.params.id]);
  res.json({ id: req.params.id, title });
});

// Delete task
app.delete("/tasks/:id", async (req, res) => {
  await db.run("DELETE FROM tasks WHERE id = ?", [req.params.id]);
  res.json({ success: true });
});

// Start server
app.listen(5000, () => console.log("✅ Server running at http://localhost:5000"));

