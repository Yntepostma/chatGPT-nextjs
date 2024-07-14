import { useState } from "react";

export const LanguageToggle = ({
  languageSetter,
}: {
  languageSetter: (language: string) => void;
}) => {
  const [language, setLanguage] = useState("English");

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const isChecked = e.target.checked;
    if (value === "Nederlands" && isChecked) {
      setLanguage(value);
    } else {
      setLanguage("English");
    }
  };
  languageSetter(language);
  return (
    <div className="ml-6 ">
      <div className="">
        <h1 className="text-xl font-bold bg-white w-fit">Answer in:</h1>
        <div className="flex flex-col p-1 bg-white border-2 border-black rounded">
          <label className="bg-white">
            <input
              className="checked:accent-green-700"
              type="checkbox"
              name="English"
              value="English"
              checked={language === "English"}
              onChange={handleSelect}
            />
            <span className="pl-2">English</span>
          </label>
          <label className="bg-white">
            <input
              type="checkbox"
              name="Nederlands"
              value="Nederlands"
              checked={language === "Nederlands"}
              onChange={handleSelect}
            />
            <span className="pl-2">Nederlands</span>
          </label>
        </div>
      </div>
      ;
    </div>
  );
};
