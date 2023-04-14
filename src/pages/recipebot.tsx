import { useState } from "react";
import { Page, Button } from "@/Components";
import { Message } from "./requestbot";
import SendMessage from "@/utils/SendMessage";
import { FormEvent } from "react";
import Markdown from "markdown-to-jsx";

const vegetables = [
  { id: 1, value: "cucumber" },
  { id: 2, value: "tomato" },
  { id: 3, value: "courgette" },
  { id: 4, value: "paprika" },
  { id: 5, value: "lettuce" },
  { id: 6, value: "broccoli" },
];
const meat_nonMeat = [
  { id: 1, value: "beef" },
  { id: 2, value: "chicken" },
  { id: 3, value: "pork" },
];

const herbs = [
  { id: 1, value: "parsely" },
  { id: 2, value: "cilantro" },
  { id: 3, value: "thyme" },
  { id: 4, value: "Rosemary" },
];

const RecipeBot = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [userInput, setUserInput] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [checkedList, setCheckedList] = useState<string[]>([]);

  const input = `recipe + instructions with the following ingredients: ${checkedList.join(
    ", "
  )} include name of recipe, ingredients and instructions. Use markdown format: bold for name of recipe, instructions and ingredients headings. Numbered list for instructions. Empty line between each part`;

  console.log("input", input);

  const handleSelect = (e: any) => {
    const value = e.target.value;
    const isChecked = e.target.checked;
    if (isChecked) {
      setCheckedList([...checkedList, value]);
    } else {
      const filteredList = checkedList.filter((item) => item !== value);
      setCheckedList(filteredList);
    }
  };

  const responses = [...messages]
    .reverse()
    .filter((message) => message.role === "chatgpt");

  const handleInput = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (input.trim() === "") {
      return;
    }
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "user", content: input },
    ]);
    try {
      const data = await SendMessage(input);
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

  console.log("checked", checkedList);

  return (
    <Page title="RecipeBot">
      <div className="flex">
        <div className="w-1/5">
          <h2 className="text-xl font-bold">Vegetables</h2>
          {vegetables.map((item) => {
            return (
              <div key={item.id} className="">
                <input
                  type="checkbox"
                  name="languages"
                  value={item.value}
                  onChange={handleSelect}
                />
                <label className="pl-2">{item.value}</label>
              </div>
            );
          })}

          <h2 className="mt-8 text-xl font-bold">Meat & Vegetarian</h2>
          {meat_nonMeat.map((item) => {
            return (
              <div key={item.id} className="">
                <input
                  type="checkbox"
                  name="languages"
                  value={item.value}
                  onChange={handleSelect}
                />
                <label className="pl-2">{item.value}</label>
              </div>
            );
          })}
          <h2 className="mt-8 text-xl font-bold">Herbs</h2>
          {herbs.map((item) => {
            return (
              <div key={item.id} className="">
                <input
                  type="checkbox"
                  name="languages"
                  value={item.value}
                  onChange={handleSelect}
                />
                <label className="pl-2">{item.value}</label>
              </div>
            );
          })}
        </div>
        <div className="w-3/5">
          <span className="text-xl font-bold ">Add any additional</span>
          <span className="ml-2 text-sm">{"(comma separated)"}</span>
          <form onSubmit={handleInput}>
            <textarea
              className="block w-4/5 h-20 px-3 py-1 mb-4 border rounded active-black :focus"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            />

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
            <h2 className="text-xl font-bold">Ingredients:</h2>
            <p className="w-4/5 px-2 mb-8 border-2 border-black rounded min-h-1/2 min-h- black">
              {checkedList.map((item, index) => {
                return <span key={index}>{item}, </span>;
              })}
            </p>
            <h2 className="text-xl font-bold">Recipe:</h2>
            {loading ? (
              "Loading....."
            ) : (
              <Markdown className="w-4/5 px-2 mb-4 border-2 border-black rounded min-h-1/2 black">
                {responses[0]?.content}
              </Markdown>
            )}
          </div>
        </div>
      </div>
    </Page>
  );
};

export default RecipeBot;
