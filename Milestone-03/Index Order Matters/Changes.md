# Document your index fixes here

# Composite Index Investigation

## Query Investigated

```sql
SELECT *
FROM employees
WHERE department = 'Sales'
AND salary > 50000;
```

## Original Index

```sql
CREATE INDEX idx_salary_department
ON employees(salary, department);
```

## Problem Analysis

The original composite index stored salary as the first column and department as the second column.

PostgreSQL follows the Left-Most Prefix Rule when using composite indexes. Because salary was the first indexed column, PostgreSQL could not efficiently use the index when filtering by department first.

As a result, the query planner could not fully optimize the query and may perform a Sequential Scan or less efficient index access.

## Fix Applied

Dropped the existing index:

```sql
DROP INDEX idx_salary_department;
```

Created a corrected index:

```sql
CREATE INDEX idx_department_salary
ON employees(department, salary);
```

## Why the Fix Works

The corrected index starts with the department column, which matches the query filtering pattern.

PostgreSQL can first identify rows belonging to the Sales department and then apply the salary condition.

This reduces the number of rows that must be examined and improves query efficiency.

## Left-Most Prefix Rule

For a composite index:

(department, salary)

PostgreSQL can efficiently use:

* department
* department and salary

However, it cannot efficiently use:

* salary alone

The order of columns inside a composite index is therefore critical for query optimization.

## Result

The corrected index better matches the query filter conditions and allows PostgreSQL to use the index more effectively, resulting in improved query performance.

Abhishek B K