# Changes

## Components Created

### Dashboard Components

- DashboardHeader – Renders the page header and branding.
- StatsRow – Displays dashboard statistics using StatCard.
- AddTaskInput – Handles task creation UI.
- TaskFilterBar – Handles filtering and searching tasks.
- TaskList – Displays the list of tasks.

### Shared Components

- StatCard – Reusable statistics card component.
- TaskItem – Reusable task row component.

## Why dashboard vs shared?

Dashboard components are specific to this page.

Shared components are generic and can be reused elsewhere, such as a mobile dashboard or analytics page.

## Props

- DashboardHeader: none
- StatsRow: totalCount, completedCount, progressPercent
- AddTaskInput: newTask, setNewTask, addTask
- TaskFilterBar: filter, setFilter, searchQuery, setSearchQuery
- TaskList: tasks, toggleTask, deleteTask
- StatCard: title, value, subtitle, color, progress
- TaskItem: task, toggleTask, deleteTask

## If the app grows 10x

- Move inline styles to CSS Modules or Tailwind.
- Introduce custom hooks for task logic.
- Add unit tests for components.
- Organize reusable UI into a design system.