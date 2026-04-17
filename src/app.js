const express = require("express");
const taskRoutes = require("./routes/tasks");

const app = express();

// Middleware
app.use(express.json());

// Root route (important for Render testing)
app.get("/", (req, res) => {
  res.send("Task API is running 🚀");
});

// Routes
app.use("/tasks", taskRoutes);

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal server error" });
});

const PORT = process.env.PORT || 3000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Task API running on port ${PORT}`);
  });
}

module.exports = app;