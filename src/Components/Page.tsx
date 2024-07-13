import Head from "next/head";
import { NavBar, Title } from "../Components";

type PageProps = {
  title: string;
  children: React.ReactNode;
  backgroundImage?: string;
};

export const Page = ({ title, children, backgroundImage }: PageProps) => {
  return (
    <div
      style={{
        backgroundImage: backgroundImage ?? undefined,
      }}
      className="bg-cover"
    >
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
    </div>
  );
};
