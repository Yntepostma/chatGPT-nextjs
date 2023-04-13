import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { useState } from "react";
import { FormEvent } from "react";
import SendMessage from "@/utils/SendMessage";

type Message = {
  role: string;
  content: string;
};

export default function Home() {
  const [userInput, setUserInput] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  console.log("messages", messages);

  const questions = [...messages]
    .reverse()
    .filter((message) => message.role === "user");

  console.log("questions", questions);

  const responses = [...messages]
    .reverse()
    .filter((message) => message.role === "chatgpt");

  console.log("responses", responses);

  const handleInput = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (userInput.trim() === "") {
      return;
    }
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "user", content: userInput },
    ]);
    try {
      const data = await SendMessage(userInput);
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "chatgpt", content: data.message.content },
      ]);
      setLoading(false);
    } catch (err: any) {
      console.log("error", err.message);
    }
  };

  return (
    <>
      <Head>
        <title>Useful Bots</title>
      </Head>
      <main className={styles.main}>
        <div>
          <h2>Useful Bots</h2>
          <form onSubmit={handleInput}>
            <div>
              <textarea
                className="block w-4/5 h-20 px-3 py-1 mb-2 ml-4 border rounded"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
              />
            </div>
            <div>
              <button type="submit">
                {loading ? "Loading" : "Send Request"}
              </button>
            </div>
          </form>
          <div>
            <h2>Question:</h2>
            <p>{questions[0]?.content}</p>
            <h2>Response:</h2>
            {loading ? "Loading....." : <p>{responses[0]?.content}</p>}
          </div>
        </div>

        <div></div>
      </main>
    </>
  );
}
