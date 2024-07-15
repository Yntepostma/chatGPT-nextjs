import { useState } from "react";
import { Page } from "@/Components";
import { Message } from "./requestbot";
import SendMessage from "@/utils/SendMessage";
import { FormEvent } from "react";
import image from "../../public/iStock-1306238204.jpg";
import { LanguageToggle } from "@/Components/LanguageToggle";

import { InputField } from "@/Components/InputField";

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

const additionals = [
  { id: 1, value: "child friendly" },
  { id: 2, value: "no children" },
  { id: 3, value: "swimming pool" },
];

const RecipeBot = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [userInput, setUserInput] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [holidayTypes, setHolidayTypes] = useState<string[]>([]);
  const [countries, setCountries] = useState<string[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  const [additionalRequirements, setAdditionalRequirements] = useState<
    string[]
  >([]);
  const [addedRequirements, setAddedRequirements] = useState<string>("");
  const [language, setLanguage] = useState<string>("");

  const input = `Provide 3 holiday suggestions based on the following requirements:

It should be in one of the following countries: ${countries}
It should be in one of the following locations: ${locations}
The type of holiday should include one of the following: ${holidayTypes}
One of the following additional requirements should be included: ${additionalRequirements}
Provide your response in ${language}. Use the following format:

**1. [Name of Suggestion]**

**Country:**

[Name of Country]

**Description:**
1. Name of the camping/hotel/B&B
2. Detailed description of the location and the environment
3. [**URL to the website of the location**]

**2. [Name of Suggestion]**

**Country:**

[Name of Country]

**Description:**
1. Name of the camping/hotel/B&B
2. Detailed description of the location and the environment
3. [**URL to the website of the location**]

**3. [Name of Suggestion]**

**Country:**

[Name of Country]

**Description:**
1. Name of the camping/hotel/B&B
2. Detailed description of the location and the environment
3. [URL to the website of the location]

Include bold headings for "Country," "Description," Provide the Description as a numbered list. Leave an empty line between each part and two empty lines between each suggestion.`;

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.name;
    const isChecked = e.target.checked;
    if (name === "type") {
      if (isChecked) {
        setHolidayTypes([...holidayTypes, value]);
      } else {
        setHolidayTypes(holidayTypes.filter((item) => item !== value));
      }
    } else if (name === "country") {
      if (isChecked) {
        setCountries([...countries, value]);
      } else {
        setCountries(countries.filter((item) => item !== value));
      }
    } else if (name === "location") {
      if (isChecked) {
        setLocations([...locations, value]);
      } else {
        setLocations(locations.filter((item) => item !== value));
      }
    } else if (name === "additionals") {
      if (isChecked) {
        setAdditionalRequirements([...additionalRequirements, value]);
      } else {
        setAdditionalRequirements(
          additionalRequirements.filter((item) => item !== value)
        );
      }
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
    setAddedRequirements(userInput);
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
        <div className="w-1/5 p-2 mr-10 bg-white border-2 border-black rounded opacity-90 ">
          <h2 className="text-xl font-bold">Type of Holiday</h2>
          {type.map((item) => {
            return (
              <div key={item.id} className="">
                <label>
                  <input
                    className="checked:accent-green-700"
                    type="checkbox"
                    name="type"
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
                    name="location"
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
                    name="country"
                    value={item.value}
                    onChange={handleSelect}
                  />
                  <span className="pl-2">{item.value}</span>
                </label>
              </div>
            );
          })}
          <h2 className="mt-6 text-xl font-bold">Additonal Requirements</h2>
          {additionals.map((item) => {
            return (
              <div key={item.id} className="">
                <label>
                  <input
                    className="checked:accent-green-700"
                    type="checkbox"
                    name="additionals"
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
                    setCountries([]);
                    setAdditionalRequirements([]);
                    setLocations([]);
                    setHolidayTypes([]);
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

        <InputField
          onSubmit={handleClick}
          title={"Preferences"}
          onClick={() => {
            setUserInput("");
            setCountries([]);
            setAdditionalRequirements([]);
            setLocations([]);
            setHolidayTypes([]);
            setAddedRequirements("");
            handleUnCheck();
          }}
          content={
            <ol className="w-full px-2 mb-2 bg-white border-2 border-black rounded bw-white min-h-1/2 min-h- black">
              <li>
                <b>Types:</b> {` ${holidayTypes.join(", ")}`}{" "}
              </li>
              <li>
                <b>Locations: </b>
                {` ${locations.join(", ")} `}
              </li>
              <li>
                <b>Countries: </b>
                {`${countries.join(", ")} `}
              </li>
              <li>
                <b>Additional requirements: </b>
                {` ${additionalRequirements.join(", ")} ${addedRequirements}`}
              </li>
            </ol>
          }
          loading={loading}
          buttonCaption="Get Suggestions"
          responses={responses}
          title2="Suggestions"
        />
        <div className="flex flex-col">
          <LanguageToggle languageSetter={setLanguage} />
        </div>
      </div>
    </Page>
  );
};

export default RecipeBot;
