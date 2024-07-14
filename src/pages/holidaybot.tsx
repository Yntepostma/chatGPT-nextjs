import { useEffect, useState } from "react";
import { Page, Button } from "@/Components";
import { Message } from "./requestbot";
import SendMessage from "@/utils/SendMessage";
import { FormEvent } from "react";
import ReactMarkdown from "react-markdown";
import image from "../../public/iStock-1306238204.jpg";
import { LanguageToggle } from "@/Components/LanguageToggle";
import remarkGfm from "remark-gfm";

const type = [
  { id: 1, value: "camping" },
  { id: 2, value: "glamping" },
  { id: 3, value: "hotel" },
  { id: 4, value: "bed & breakfast" },
];
const location = [
  { id: 1, value: "beach" },
  { id: 2, value: "mountains" },
  { id: 3, value: "country side" },
  { id: 4, value: "lake" },
  { id: 4, value: "city" },
];

const country = [
  { id: 1, value: "Netherlands" },
  { id: 2, value: "Germany" },
  { id: 3, value: "France" },
  { id: 4, value: "Belgium" },
  { id: 5, value: "Spain" },
  { id: 6, value: "Portugal" },
  { id: 7, value: "Austria" },
  { id: 8, value: "Switzerland" },
];

const additionalRequirements = [
  { id: 1, value: "child friendly" },
  { id: 2, value: "no children" },
  { id: 3, value: "swimming pool" },
];

const RecipeBot = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [userInput, setUserInput] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [checkedList, setCheckedList] = useState<string[]>([]);
  const [addedIngredients, setAddedIngredients] = useState<string>("");
  const [language, setLanguage] = useState<string>("");

  const input = `Create a recipe with the following ingredients: ${checkedList?.join(
    ", "
  )}, ${addedIngredients}. Provide your response in ${language}.You can include additional ingredients. Use the following format:
### 
**Name of the recipe**

**Ingredients:**
- List of ingredients

**Instructions:**
1. Step-by-step instructions

Include bold headings for "Ingredients" and "Instructions". Provide the instructions as a numbered list. Leave an empty line between each part.
###`;

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
    <Page backgroundImage={`url(${image.src})`} title="HolidayBot">
      <div className="flex">
        <div className="w-1/5 p-2 mr-10 bg-white border-2 border-black rounded ">
          <h2 className="text-xl font-bold">Type of Holiday</h2>
          {type.map((item) => {
            return (
              <div key={item.id} className="">
                <label>
                  <input
                    className="checked:accent-green-700"
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

          <h2 className="mt-6 text-xl font-bold">Location</h2>
          {location.map((item) => {
            return (
              <div key={item.id} className="">
                <label>
                  <input
                    className="checked:accent-green-700"
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
          <h2 className="mt-6 text-xl font-bold">Country</h2>
          {country.map((item) => {
            return (
              <div key={item.id} className="">
                <label>
                  <input
                    className="checked:accent-green-700"
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
          <h2 className="mt-6 text-xl font-bold">Additonal Requirements</h2>
          {additionalRequirements.map((item) => {
            return (
              <div key={item.id} className="">
                <label>
                  <input
                    className="checked:accent-green-700"
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
          <h2 className="text-xl font-bold bg-white w-fit">Ingredients:</h2>
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
          <h2 className="text-xl font-bold bg-white w-fit">Recipe:</h2>
          {loading ? (
            "Loading....."
          ) : (
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              className="w-full px-2 mb-4 bg-white border-2 border-black rounded min-h-1/2 black"
            >
              {responses[0]?.content}
            </ReactMarkdown>
          )}
        </div>
        <div className="flex flex-col">
          <LanguageToggle languageSetter={setLanguage} />
        </div>
      </div>
    </Page>
  );
};

export default RecipeBot;
