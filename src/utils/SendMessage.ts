import { FormEvent } from "react";

const SendMessage = async (userInput: string) => {
  try {
    const response = await fetch("api/generateResponse", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userInput }),
    });
    return await response.json();
  } catch (err: any) {
    console.log("error", err.message);
  }
};

export default SendMessage;
