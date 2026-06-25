# Observations

## Issues Found

The original schema lacked database-level validation and allowed invalid data to be inserted.

Problems identified:

* Tasks could be created with NULL titles.
* Duplicate email addresses were allowed.
* Priority values outside the valid range were accepted.
* Tasks could reference projects that did not exist.

These issues could lead to inconsistent and unreliable data.

---

## Constraints Implemented

### NOT NULL Constraints

Added to:

* users.name
* users.email
* projects.project_name
* tasks.title

Reason:
These fields are mandatory and should never be empty.

### UNIQUE Constraint

Added to:

* users.email

Reason:
Each user must have a unique email address.

### CHECK Constraint

Added to:

* tasks.priority

Rule:

```sql
CHECK (priority BETWEEN 1 AND 5)
```

Reason:
Only priority values from 1 to 5 are considered valid.

### FOREIGN KEY Constraint

Added to:

* tasks.project_id

Rule:

```sql
FOREIGN KEY (project_id)
REFERENCES projects(id)
```

Reason:
Every task must belong to a valid existing project.

---

## Result

After implementing the constraints:

* NULL task titles are rejected.
* Duplicate email addresses are rejected.
* Invalid priority values are rejected.
* Tasks referencing non-existent projects are rejected.

Valid records from sample_data.sql continue to insert successfully.

The database now enforces data integrity at the database level and prevents invalid data from being stored.
