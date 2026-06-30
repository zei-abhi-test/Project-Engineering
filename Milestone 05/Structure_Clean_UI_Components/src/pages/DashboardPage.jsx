// DashboardPage.jsx
// TODO: This file is getting really long... but it works so let's not touch it 🙃

import { useState } from "react";
import tasks from "../data/tasks";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import StatsRow from "../components/dashboard/StatsRow";
import AddTaskInput from "../components/dashboard/AddTaskInput";
import TaskFilterBar from "../components/dashboard/TaskFilterBar";
import TaskList from "../components/dashboard/TaskList";

export default function DashboardPage() {
  const [taskList, setTaskList] = useState(tasks);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const addTask = () => {
    if (!newTask.trim()) return;
    setTaskList([
      ...taskList,
      {
        id: Date.now(),
        title: newTask,
        completed: false,
        priority: "medium",
        tag: "general",
        createdAt: new Date().toISOString(),
      },
    ]);
    setNewTask("");
  };

  const toggleTask = (id) => {
    setTaskList(
      taskList.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTask = (id) => {
    setTaskList(taskList.filter((t) => t.id !== id));
  };

  const filtered = taskList
    .filter((t) => {
      if (filter === "active") return !t.completed;
      if (filter === "completed") return t.completed;
      return true;
    })
    .filter((t) =>
      t.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const completedCount = taskList.filter((t) => t.completed).length;
  const totalCount = taskList.length;
  const progressPercent = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

  return (
    <div style={{ minHeight: "100vh", background: "#0f0f1a", color: "#e2e8f0", fontFamily: "sans-serif" }}>

      <DashboardHeader />
      <StatsRow
        totalCount={totalCount}
        completedCount={completedCount}
        progressPercent={progressPercent}
      />

      <AddTaskInput
        newTask={newTask}
        setNewTask={setNewTask}
        addTask={addTask}
      />

      <TaskFilterBar
        filter={filter}
        setFilter={setFilter}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Using the imported TaskList component (recommended) */}
      <TaskList
        tasks={filtered}
        toggleTask={toggleTask}
        deleteTask={deleteTask}
      />

      {/* 
        Keeping your inline task rendering as requested (even though it's duplicate with TaskList).
        You can remove this block later if you want to rely only on the TaskList component.
      */}
      {filtered.map((task) => (
        <div
          key={task.id}
          style={{
            background: "#1a1a2e",
            border: `1px solid ${task.completed ? "#1e3a2e" : "#2d2d44"}`,
            borderRadius: 12,
            padding: "14px 18px",
            display: "flex",
            alignItems: "center",
            gap: 14,
            transition: "border-color 0.2s",
            opacity: task.completed ? 0.6 : 1,
            marginBottom: 8 // added small spacing for inline version
          }}
        >
          <button
            onClick={() => toggleTask(task.id)}
            style={{
              width: 22,
              height: 22,
              borderRadius: 6,
              border: `2px solid ${task.completed ? "#22c55e" : "#4b5563"}`,
              background: task.completed ? "#22c55e" : "transparent",
              cursor: "pointer",
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: 12
            }}
          >
            {task.completed ? "✓" : ""}
          </button>
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontSize: 14,
                fontWeight: 500,
                color: task.completed ? "#64748b" : "#e2e8f0",
                textDecoration: task.completed ? "line-through" : "none"
              }}
            >
              {task.title}
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
              <span
                style={{
                  fontSize: 11,
                  padding: "2px 8px",
                  borderRadius: 99,
                  background:
                    task.priority === "high"
                      ? "rgba(239,68,68,0.15)"
                      : task.priority === "medium"
                      ? "rgba(245,158,11,0.15)"
                      : "rgba(34,197,94,0.15)",
                  color:
                    task.priority === "high"
                      ? "#f87171"
                      : task.priority === "medium"
                      ? "#fbbf24"
                      : "#4ade80"
                }}
              >
                {task.priority}
              </span>
              <span
                style={{
                  fontSize: 11,
                  padding: "2px 8px",
                  borderRadius: 99,
                  background: "rgba(99,102,241,0.12)",
                  color: "#a78bfa"
                }}
              >
                {task.tag}
              </span>
            </div>
          </div>
          <button
            onClick={() => deleteTask(task.id)}
            style={{
              background: "transparent",
              border: "none",
              color: "#475569",
              cursor: "pointer",
              fontSize: 16,
              padding: "4px 8px",
              borderRadius: 6
            }}
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}