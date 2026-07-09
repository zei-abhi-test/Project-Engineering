import fetch from "node-fetch";

export async function summarizeNotes(notes) {
  const response = await fetch(
    "https://api.openai.com/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are a concise study note summariser. Return a bullet-point summary of the key concepts.",
          },
          {
            role: "user",
            content: notes,
          },
        ],
      }),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || "Failed to summarize");
  }

  const data = await response.json();

  return data.choices[0].message.content;
}