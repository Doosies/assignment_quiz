interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export function Button({ children, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="bg-blue rounded-md text-white py-2 px-1 transition-colors hover:bg-blue-hover"
    >
      {children}
    </button>
  );
}
