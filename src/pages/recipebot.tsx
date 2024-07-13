import { useEffect, useState } from "react";
import { Page, Button } from "@/Components";
import { Message } from "./requestbot";
import SendMessage from "@/utils/SendMessage";
import { FormEvent } from "react";
import ReactMarkdown from "react-markdown";
import image from "../../public/iStock-1198380802.jpg";

const vegetables = [
  { id: 1, value: "cucumber" },
  { id: 2, value: "tomato" },
  { id: 3, value: "courgette" },
  { id: 4, value: "paprika" },
  { id: 5, value: "lettuce" },
  { id: 6, value: "broccoli" },
  { id: 7, value: "potatos" },
];
const meat_nonMeat = [
  { id: 1, value: "beef" },
  { id: 2, value: "chicken" },
  { id: 3, value: "pork" },
  { id: 4, value: "salmon" },
  { id: 5, value: "tuna" },
  { id: 6, value: "tofu" },
  { id: 7, value: "tempeh" },
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
  const [addedIngredients, setAddedIngredients] = useState<string>("");

  const input = `create a recipe + instructions with the following ingredients: ${checkedList?.join(
    ", "
  )}, ${addedIngredients}. You can include additional ingredients. format: ### include name, ingredients and instructions. Use markdown format: bold for name, instructions and ingredients headings. Numbered list for instructions. Empty line between each part###`;

  console.log(input);

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

  const handleUnCheck = () => {
    const checkbox: NodeListOf<HTMLInputElement> = document.querySelectorAll(
      'input[type="checkbox"]'
    );
    for (let i = 0; i < checkbox.length; i++) {
      checkbox[i].checked = false;
    }
  };

  const responses = [...messages]
    .reverse()
    .filter((message) => message.role === "chatgpt");

  const handleInput = (e: FormEvent) => {
    e.preventDefault();
    setAddedIngredients(userInput);
    setUserInput("");
  };

  const handleClick = async (e: FormEvent) => {
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

  return (
    <Page backgroundImage={`url(${image.src})`} title="RecipeCreator">
      <div className="flex">
        <div className="w-1/5 p-2 mr-10 bg-white border-2 border-black ">
          <h2 className="text-xl font-bold">Vegetables</h2>
          {vegetables.map((item) => {
            return (
              <div key={item.id} className="">
                <label>
                  <input
                    type="checkbox"
                    name="ingredients"
                    value={item.value}
                    onChange={handleSelect}
                  />
                  <span className="pl-2">{item.value}</span>
                </label>
              </div>
            );
          })}

          <h2 className="mt-6 text-xl font-bold">Meat, Fish & Vegetarian</h2>
          {meat_nonMeat.map((item) => {
            return (
              <div key={item.id} className="">
                <label>
                  <input
                    type="checkbox"
                    name="ingredients"
                    value={item.value}
                    onChange={handleSelect}
                  />
                  <span className="pl-2">{item.value}</span>
                </label>
              </div>
            );
          })}
          <h2 className="mt-6 text-xl font-bold">Herbs</h2>
          {herbs.map((item) => {
            return (
              <div key={item.id} className="">
                <label>
                  <input
                    type="checkbox"
                    name="ingredients"
                    value={item.value}
                    onChange={handleSelect}
                  />
                  <span className="pl-2">{item.value}</span>
                </label>
              </div>
            );
          })}
          <div className="mt-6">
            <h2 className="text-xl font-bold ">Add any additional</h2>
            <span className="text-sm ">{"(comma separated)"}</span>
            <form onSubmit={handleInput}>
              <textarea
                className="block w-4/5 h-10 px-3 py-1 mb-2 border rounded active-black :focus"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
              />

              <div>
                <button
                  className="px-2 mb-2 mr-2 border-2 border-black w-content-fit hover:font-bold "
                  type="submit"
                >
                  add
                </button>
                <button
                  className="px-2 mb-2 bg-white border-2 border-black w-content-fit hover:font-bold"
                  type="reset"
                  onClick={() => {
                    setCheckedList([]);
                    handleUnCheck();
                    setUserInput("");
                  }}
                >
                  clear
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="w-3/6">
          <h2 className="text-xl font-bold">Ingredients:</h2>
          <form onSubmit={handleClick}>
            <p className="w-full px-2 mb-2 bg-white border-2 border-black rounded bw-white min-h-1/2 min-h- black">
              {checkedList.join(", ")} {addedIngredients}
            </p>
            <div className="flex justify-between">
              {loading ? (
                <Button disabled={true}>Loading</Button>
              ) : (
                <Button disabled={false} type="submit">
                  Find Recipe
                </Button>
              )}
              <button
                className="h-10 px-2 mb-2 bg-white border-2 border-black w-content-fit hover:font-bold "
                type="reset"
                onClick={() => {
                  setUserInput("");
                  setCheckedList([]);
                  setAddedIngredients("");
                  handleUnCheck();
                }}
              >
                clear
              </button>
            </div>
          </form>
          <h2 className="text-xl font-bold">Recipe:</h2>
          {loading ? (
            "Loading....."
          ) : (
            <ReactMarkdown className="w-full px-2 mb-4 bg-white border-2 border-black rounded min-h-1/2 black">
              {responses[0]?.content}
            </ReactMarkdown>
          )}
        </div>
      </div>
    </Page>
  );
};

export default RecipeBot;
