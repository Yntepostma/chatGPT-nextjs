import { useState } from "react";
import { FormEvent } from "react";
import Head from "next/head";
import SendMessage from "@/utils/SendMessage";
import { Button, Title, Page } from "@/Components";

type Message = {
  role: string;
  content: string;
};

const RequestBot = () => {
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
      setUserInput("");
    } catch (err: any) {
      console.log("error", err.message);
    }
  };

  return (
    <Page title="RequestBot">
      <div className="flex">
        <div className="w-3/5">
          <form onSubmit={handleInput}>
            <div>
              <textarea
                className="block w-4/5 h-20 px-3 py-1 mb-4 border rounded active-black :focus"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
              />
            </div>
            <div>
              {loading ? (
                <Button disabled={true} type="submit">
                  Loading
                </Button>
              ) : (
                <Button disabled={false} type="submit">
                  Send Request
                </Button>
              )}
            </div>
          </form>
          <div>
            <h2 className="text-xl font-bold">Question:</h2>
            <p className="w-4/5 px-2 mb-8 border-2 border-black rounded min-h-1/2 min-h- black">
              {questions[0]?.content}
            </p>
            <h2 className="text-xl font-bold">Response:</h2>
            {loading ? (
              "Loading....."
            ) : (
              <p className="w-4/5 px-2 mb-4 border-2 border-black rounded min-h-1/2 black">
                {responses[0]?.content}
              </p>
            )}
          </div>
        </div>

        <div className="w-3/5">
          {[...messages].map((message, index) => {
            if (message.role === "user") {
              return (
                <p className="underline underline-offset-1" key={index}>
                  &#62; {message.content}
                </p>
              );
            } else {
              return <p key={index}>&#62; {message.content}</p>;
            }
          })}
        </div>
      </div>
    </Page>
  );
};

export default RequestBot;