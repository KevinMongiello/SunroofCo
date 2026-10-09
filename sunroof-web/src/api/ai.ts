const AI_PATH = "http://localhost:3000/ai/";

export const sendChat = async (message: string) => {
  const resp = await fetch(AI_PATH, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message,
    }),
  });

  if (!resp.ok) {
    throw new Error(`HTTP ${resp.status}`,)
  }

  return resp.text();
};
