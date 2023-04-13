import Link from "next/link";

export const NavBar = () => {
  return (
    <nav className="flex flex-wrap items-center justify-between p-6 font-mono bg-green-800">
      <div className="flex items-center flex-shrink-0 mr-6 text-white">
        {/* <img className="h-10" src={image} alt="bot" /> */}
        <Link href="/" className="text-xl font-semibold tracking-tight">
          Useful Bots
        </Link>
      </div>
      <div className="block lg:hidden">
        <button className="flex items-center px-3 py-2 text-teal-200 border border-green-400 rounded hover:text-white hover:border-white">
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />ß
        </button>
      </div>
      <div className="flex-grow block w-full lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          <Link
            href="/requestbot"
            className="block mt-4 mr-4 text-gray-400 lg:inline-block lg:mt-0 hover:text-white"
          >
            RequestBot
          </Link>
          <Link
            href="/recipebot"
            className="block mt-4 mr-4 text-gray-400 lg:inline-block lg:mt-0 hover:text-white"
          >
            RecipeBot
          </Link>
        </div>
      </div>
    </nav>
  );
};
