// src/api/chat.js
export const sendMessage = async (message) => {
  try {
    const response = await fetch("http://localhost:5000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    const data = await response.json();
    return data.reply;
  } catch (err) {
    console.error("Chat API error:", err);
    return "Sorry, something went wrong.";
  }
};
