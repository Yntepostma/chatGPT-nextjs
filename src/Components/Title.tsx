type TitleLayoutProps = {
  children: React.ReactNode;
};

export const Title = ({ children }: TitleLayoutProps) => {
  return (
    <h1 className="mb-4 font-mono text-2xl underline text-bold underline-offset-4 ">
      {children}
    </h1>
  );
};
