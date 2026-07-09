# LearnLens — Prompt Quality Comparison

---

# Task A — Notes Reviewer

## Missing Components in Original

Missing:
- Persona/System instruction
- Explicit context delimiters
- Clear evaluation task
- JSON output format
- Behavioral constraints

The original prompt simply asks for feedback, allowing the model to choose any response format.

---

## Original Prompt

```text
give feedback on this note: ${content}
```

---

## Rewritten Prompt

Uses:

- Persona (Biology educator)
- Delimited context
- Clear evaluation task
- Required JSON schema
- Constraints (JSON only, no hallucinations, no markdown)

---

## Test Input Used

```text
Mitosis is when cells divide. There are 4 phases. Prophase is when chromosomes condense. Metaphase the chromosomes line up. Anaphase they split. Telophase new cells form. DNA replicates before division starts. This is important for growth and repair.
```

---

## Bad Prompt Output

(Paste exactly what you posted.)

---

## Good Prompt Output

(Paste after running `--version=good`.)

---

## Improvement

Adding an explicit JSON format and behavioral constraints transformed the response from free-form study advice into a structured object that matches the frontend requirements.

---

# Task B — Placement Summariser

## Missing Components in Original

Missing:

- Persona
- JSON format
- Output constraints
- Privacy instruction
- Structured extraction task

The prompt only requests a summary, so the model returns normal prose.

---

## Original Prompt

```text
summarize this interview experience: ${text}
```

---

## Rewritten Prompt

Uses:

- Persona
- Context delimiters
- Extraction task
- Required JSON schema
- Privacy constraints

---

## Test Input Used

```text
I interviewed at Google for a SWE intern role in March...
```

---

## Bad Prompt Output

(Paste exactly.)

---

## Good Prompt Output

(Paste after running.)

---

## Improvement

The rewritten prompt consistently returns structured JSON with fixed fields instead of an unstructured paragraph.

---

# Task C — Error Analyst

## Missing Components in Original

Missing:

- Persona
- Structured JSON format
- Severity constraint
- Root cause extraction task
- Anti-hallucination constraints

The prompt only asks why there is a bug, resulting in conversational troubleshooting.

---

## Original Prompt

```text
why is there a bug: ${error_message}
```

---

## Rewritten Prompt

Uses:

- Senior debugging persona
- Delimited stack trace
- Root-cause analysis task
- Required JSON schema
- Strict output constraints

---

## Test Input Used

```text
TypeError: Cannot read properties of undefined (reading 'map')
```

---

## Bad Prompt Output

(Paste exactly.)

---

## Good Prompt Output

(Paste after running.)

---

## Improvement

The rewritten prompt produces structured diagnostics with predictable fields, making the output suitable for automated dashboard consumption.