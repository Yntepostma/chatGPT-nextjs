import Head from "next/head";
import { NavBar, Title } from "../Components";

type PageProps = {
  title: string;
  children: React.ReactNode;
  backgroundImage?: string;
  className?: string;
};

export const Page = ({
  title,
  children,
  backgroundImage,
  className,
}: PageProps) => {
  return (
    <div
      style={{
        backgroundImage: backgroundImage ?? undefined,
      }}
      className={`h-full bg-scroll bg-contain ${className}`}
    >
      <Head>
        <title>{title} - UseFul Bots</title>
      </Head>
      <header className="sticky top-0 z-30 ">
        <NavBar />
      </header>
      <main className="px-6 py-4 font-sans">
        <Title>{title}</Title>
        {children}
      </main>
    </div>
  );
};
