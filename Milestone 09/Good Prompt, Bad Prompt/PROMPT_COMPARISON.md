# LearnLens — Prompt Quality Comparison

---

## Task A — Notes Reviewer

### Missing Components in Original
[List which of the 5 components are absent and what gap each creates]

### Original Prompt

### Rewritten Prompt

### Test Input Used

### Bad Prompt Output
[Paste raw LLM response here — do not paraphrase]

### Good Prompt Output
[Paste raw LLM response here — do not paraphrase]

### Improvement
[One sentence: missing component name + concrete structural difference in output]
Missing:
• System Instruction – No AI identity or expertise defined.
• Format – No JSON structure specified.
• Constraints – No restrictions on markdown, hallucinations, or output format.

Present:
• Context (partial) – Note content is included but not clearly delimited.
• Task (partial) – "Give feedback" is too vague.
---

## Task B — Placement Summariser

[same structure]
Missing:
• System Instruction – No role or privacy requirements.
• Format – No expected JSON fields defined.
• Constraints – No GDPR/privacy instruction or data type restrictions.

Present:
• Context (partial) – Interview text is included.
• Task (partial) – "Summarize" is vague.

---

## Task C — Error Analyst

[same structure]
Missing:
• System Instruction – No debugging persona.
• Format – No structured schema.
• Constraints – No severity enum or speculation restrictions.

Present:
• Context (partial) – Error log provided.
• Task (partial) – "Why is there a bug" is ambiguous.
