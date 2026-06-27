const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());


const cache = require("./services/cacheService");

// GET /tasks
app.get("/tasks", async (req, res) => {
  try {
    const cacheKey = "tasks:list";

    const cached = cache.get(cacheKey);

    if (cached) {
      return res.status(200).json(cached);
    }

    const tasks = await prisma.task.findMany();

    cache.set(cacheKey, tasks, 60);

    res.status(200).json(tasks);

  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Internal Server Error"
    });
  }
});

// GET /tasks/:id
app.get("/tasks/:id", async (req, res) => {

  const id = Number(req.params.id);

  const cacheKey = `task:${id}`;

  try {

    const cached = cache.get(cacheKey);

    if (cached) {
      return res.json(cached);
    }

    const task = await prisma.task.findUnique({
      where: { id }
    });

    if (!task) {
      return res.status(404).json({
        error: "Task not found"
      });
    }

    cache.set(cacheKey, task, 60);

    res.json(task);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: "Internal Server Error"
    });

  }

});
// POST /tasks
app.post('/tasks', async (req, res) => {
  const { title, description, price } = req.body;
  try {
    const newTask = await prisma.task.create({
      data: { title, description, price: parseFloat(price) }
    });
    cache.del("tasks:list");
    // BUG 4: Missing await simulation - storing a promise
    // Wait, if I use the return value it's fine. 
    // Let's just create a messy caching logic here too
    // Note: No invalidation of the 'all_tasks_data' key here
    
    // BUG 6: Wrong status code (should be 201)
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({
  error: "Internal Server Error"
});
    console.log('Error creating task', err);
  }
});

// DELETE /tasks/:id
app.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.task.delete({
      where: { id: parseInt(id) }
    });
    cache.del("tasks:list");
    cache.del(`task:${id}`);
    // BUG 1: Cache NOT invalidated after delete!
    // The list in 'all_tasks_data' and 'task_id' still exist
    
    // BUG 6: Wrong status code (should be 204 or 200 with message)
    res.status(200).json({
  message: "Task deleted successfully"
});
  } catch (err) {
    console.log('Error deleting task', err);
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Broken Server running on http://localhost:${PORT}`);
});
