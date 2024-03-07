interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  onlyText?: boolean;
  className?: string;
}

export function Button({ children, onClick, onlyText, className }: ButtonProps) {
  const bgColor = onlyText ? 'bg-white hover:bg-gray border' : 'text-white bg-blue hover:bg-blue-hover';

  return (
    <button
      onClick={onClick}
      className={`rounded-md  p-2 transition-colors ${bgColor} ${className}`}
    >
      {children}
    </button>
  );
}
