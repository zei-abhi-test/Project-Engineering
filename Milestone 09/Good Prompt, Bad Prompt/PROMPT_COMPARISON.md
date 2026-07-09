# LearnLens – Prompt Quality Comparison

## Task A – Notes Reviewer

### Missing Components in Original

Missing:
- System Instruction (no persona or expertise defined)
- Explicit context delimiters
- Structured evaluation task
- Required output format
- Constraints

Present:
- Context (partial)
- Task (very vague)

---

### Original Prompt

```text
give feedback on this note: ${content}
```

---

### Rewritten Prompt

The rewritten prompt includes:

- System persona (Biology educator)
- Delimited context
- Explicit evaluation criteria
- Required JSON schema
- Output constraints

---

### Test Input

```text
Mitosis is when cells divide. There are 4 phases. Prophase is when chromosomes condense. Metaphase the chromosomes line up. Anaphase they split. Telophase new cells form. DNA replicates before division starts. This is important for growth and repair.
```

---

### Bad Prompt Output

The model returned free-form prose with headings, suggestions, and a rewritten paragraph. Although helpful, the output was inconsistent and unsuitable for direct programmatic use.

---

### Good Prompt Output

```json
{
  "clarity": {
    "score": 7,
    "feedback": "Simple and easy to follow, but the phrasing is very brief and some sentences are fragmentary."
  },
  "completeness": {
    "score": 5,
    "feedback": "Covers the main mitosis phases and mentions DNA replication and function, but leaves out key details such as cytokinesis and what happens in each phase."
  },
  "accuracy": {
    "score": 6,
    "feedback": "Mostly correct, but telophase does not directly mean new cells form; cell division is completed by cytokinesis, which is not mentioned."
  },
  "overallScore": 6,
  "topPriority": "Add missing key steps and clarify that cytokinesis completes cell division."
}
```

---

### Improvement

The rewritten prompt enforced a JSON structure, making the response predictable, machine-readable, and suitable for frontend rendering without additional parsing.

---

# Task B – Placement Summariser

### Missing Components in Original

Missing:
- System instruction
- Structured extraction task
- Required JSON format
- Privacy constraints
- Output restrictions

Present:
- Context
- Basic summarization request

---

### Original Prompt

```text
summarize this interview experience: ${text}
```

---

### Rewritten Prompt

The rewritten prompt adds:

- Interview summariser persona
- Privacy requirements
- Structured extraction task
- JSON schema
- Output constraints

---

### Test Input

```text
I interviewed at Google for a SWE intern role in March...
```

---

### Bad Prompt Output

The model produced a readable paragraph summarizing the interview experience, but it contained no structured fields and could not be consumed directly by the application.

---

### Good Prompt Output

```json
{
  "company": "Google",
  "role": "SWE intern",
  "difficulty": 3,
  "keyTopics": [
    "arrays",
    "dynamic programming"
  ],
  "outcome": "Offer received but turned down due to relocation"
}
```

---

### Improvement

The rewritten prompt consistently extracts only the required information into a predictable JSON object, making the output reliable for downstream processing.

---

# Task C – Error Analyst

### Missing Components in Original

Missing:
- System instruction
- Structured debugging task
- JSON output format
- Severity constraints
- Anti-hallucination rules

Present:
- Error message
- Basic debugging request

---

### Original Prompt

```text
why is there a bug: ${error_message}
```

---

### Rewritten Prompt

The rewritten prompt introduces:

- Senior debugging persona
- Clear analysis task
- JSON schema
- Controlled severity values
- Strict output constraints

---

### Test Input

```text
TypeError: Cannot read properties of undefined (reading 'map')
```

---

### Bad Prompt Output

The model produced conversational troubleshooting advice with multiple possible causes and suggested fixes. While useful to a developer, the output lacked structure and consistency.

---

### Good Prompt Output

```json
{
  "rootCause": "UserList.render is calling .map() on an undefined value, so the list data expected by the component is not initialized or not being passed in.",
  "affectedComponent": "UserList.jsx",
  "severity": "medium",
  "recommendedFix": "Ensure the value being mapped is always an array before render, by initializing it to an empty array or guarding with a conditional check before calling .map().",
  "codeSnippet": "UserList.render (/app/components/UserList.jsx:34:22)"
}
```

---

### Improvement

The rewritten prompt transformed conversational debugging advice into structured diagnostics that can be displayed directly in dashboards or consumed by automated systems.

---

# Overall Conclusion

Applying the five-component prompt engineering framework significantly improved output quality across all three tasks.

The original prompts produced inconsistent free-form responses that varied in format and were difficult to consume programmatically.

The rewritten prompts introduced:

- Clear system instructions
- Well-defined context
- Explicit tasks
- Fixed JSON output schemas
- Strict constraints

As a result, every response became predictable, structured, and suitable for direct integration into the LearnLens application without additional parsing or manual interpretation.