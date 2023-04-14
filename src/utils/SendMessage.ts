import { Message } from "@/pages/requestbot";

const SendMessage = async (input: string) => {
  try {
    const response = await fetch("api/generateResponse", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input }),
    });
    return await response.json();
  } catch (err: any) {
    console.log("error", err.message);
  }
};

export default SendMessage;
