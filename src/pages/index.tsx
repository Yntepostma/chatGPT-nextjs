import { Button, Page } from "@/Components";
import Image from "next/image";
import image from "../../public/iStock-2156736483.jpg";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [action, setAction] = useState<boolean>(true);
  return (
    <Page className="" title="">
      <div className="flex">
        <div className="flex flex-col content-center">
          <h1 className="z-10 p-4 font-mono text-2xl bold ">
            Welcome to UseFul Bots
          </h1>
          <Image
            className={`z-0 mt-7 ${action && "animate-bounce"}`}
            src={image}
            alt="RobotIUmage"
            width={300}
            height={300}
          />
          <Button
            margin={28}
            onClick={() => setAction((prevState) => !prevState)}
          >
            {action ? "freeze" : "fire up"}
          </Button>
        </div>
        <div className="font-mono ">
          <div>
            <h1 className="mt-40 font-mono text-xl font-bold">
              Enjoy the free service of our helping Bots!
            </h1>
            <br></br>
            <ul>
              <li>
                <Link href="/recipebot">
                  <span className="font-bold text-green-600">RecipeBot</span>
                </Link>
                : see whats left in your fridge and{" "}
                <Link href="/recipebot">
                  <span className="font-bold text-green-600">RecipeBot</span>{" "}
                </Link>{" "}
                will find a matching recipe
              </li>
              <br></br>
              <li>
                <Link href="/holidaybot">
                  <span className="font-bold text-blue-600">HolidayBot</span>
                </Link>
                : want some interesting suggestions for your next trip? Ask{" "}
                <Link href="/holidaybot">
                  <span className="font-bold text-blue-600">HolidayBot</span>
                </Link>
              </li>
              <br></br>
              <li>
                <Link href="/requestbot">
                  <span className="font-bold text-yellow-500">RequestBot</span>
                </Link>
                : looking for some company or just a chitchat?{" "}
                <Link href="/requestbot">
                  <span className="font-bold text-yellow-500">Requestbot</span>
                </Link>{" "}
                is your friend.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Page>
  );
}
