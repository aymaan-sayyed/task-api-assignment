const express = require("express");
const router = express.Router();

let tasks = [];

// GET all tasks
router.get("/", (req, res) => {
  res.status(200).json(tasks);
});

// POST create task
router.post("/", (req, res) => {
  const { title } = req.body;

  if (!title || title.trim() === "") {
    return res.status(400).json({ error: "Title is required" });
  }

  const newTask = {
    id: Date.now().toString(),
    title,
    status: "todo",
  };

  tasks.push(newTask);

  res.status(201).json(newTask);
});

// PUT update task
router.put("/:id", (req, res) => {
  const { title } = req.body;

  if (!title || title.trim() === "") {
    return res.status(400).json({ error: "Title is required" });
  }

  const task = tasks.find((t) => t.id === req.params.id);

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  task.title = title;

  res.status(200).json(task);
});

// DELETE task
router.delete("/:id", (req, res) => {
  const index = tasks.findIndex((t) => t.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ error: "Task not found" });
  }

  tasks.splice(index, 1);

  res.status(204).send();
});

// PATCH complete
router.patch("/:id/complete", (req, res) => {
  const task = tasks.find((t) => t.id === req.params.id);

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  task.status = "done";

  res.status(200).json(task);
});

module.exports = router;