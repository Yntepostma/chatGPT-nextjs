import { NavBar } from "../Components";

type usefulBotsLayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: usefulBotsLayoutProps) {
  return (
    <>
      <NavBar />
      <main className="m-4 font-mono">{children}</main>
    </>
  );
}
