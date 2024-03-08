interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  color?: 'primary' | 'secondary';
}

export function Button({ children, onClick, className, color = 'primary' }: ButtonProps) {
  const bgColor = color === 'primary' ? 'text-white bg-blue hover:bg-blue-hover' : 'bg-white hover:bg-gray border';

  return (
    <button
      onClick={onClick}
      className={`rounded-md  p-2 transition-colors ${bgColor} ${className}`}
    >
      {children}
    </button>
  );
}
