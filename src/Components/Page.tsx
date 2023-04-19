import Head from "next/head";
import { NavBar, Title } from "../Components";

type PageProps = {
  title: string;
  children: React.ReactNode;
};

export const Page = ({ title, children }: PageProps) => {
  return (
    <>
      <Head>
        <title>{title} - UseFul Bots</title>
      </Head>
      <header className="sticky top-0 z-30 ">
        <NavBar />
      </header>
      <main className="px-6 py-4 mt-6 font-mono">
        <Title>{title}</Title>
        {children}
      </main>
    </>
  );
};
