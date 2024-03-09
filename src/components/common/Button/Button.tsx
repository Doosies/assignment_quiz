interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  color?: 'primary' | 'secondary';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'lg' | '2xl' | 'full';
}

export function Button({ children, onClick, className, color = 'primary', size = 'md' }: ButtonProps) {
  const bgColor = color === 'primary' ? 'text-white bg-blue hover:bg-blue-hover' : 'bg-white hover:bg-gray border';
  const buttonSize = size === 'full' ? 'w-full' : `text-${size}`;

  return (
    <button
      onClick={onClick}
      className={`rounded-md  p-2 px-4 transition-colors ${buttonSize} ${bgColor} ${className}`}
    >
      {children}
    </button>
  );
}
