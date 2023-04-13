import Navbar from "./Navbar";

type usefulBotsLayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: usefulBotsLayoutProps) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}
