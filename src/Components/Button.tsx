type ButtonLayoutProps = {
  children: React.ReactNode;
  type?: string;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  margin?: number;
};

export const Button = ({
  children,
  disabled,
  onClick,
  margin,
}: ButtonLayoutProps) => {
  return (
    <div>
      {disabled ? (
        <button
          onClick={onClick}
          className="relative inline-block px-4 py-2 mb-10 font-medium bg-white group"
        >
          <span className="absolute inset-0 w-full h-full bg-black border-2 border-white"></span>
          <span className="relative text-white">{children}</span>
        </button>
      ) : (
        <button
          onClick={onClick}
          className={`relative inline-block px-4 py-2 mb-10 font-medium bg-white group `}
          style={{ marginLeft: `${margin}px` }}
        >
          <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
          <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
          <span className="relative text-black group-hover:text-white">
            {children}
          </span>
        </button>
      )}
    </div>
  );
};
