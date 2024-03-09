interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  noBorder?: boolean;
  color?: 'primary' | 'secondary' | 'none';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'lg' | '2xl' | 'full';
}

export function Button({ children, onClick, className, noBorder, color = 'primary', size = 'md' }: ButtonProps) {
  const bgColor = color === 'primary' ? 'text-white bg-blue hover:bg-blue-hover' : 'bg-white hover:bg-gray';
  const buttonSize = size === 'full' ? 'w-full' : `text-${size}`;
  const border = noBorder ? '' : 'border';

  return (
    <button
      onClick={onClick}
      className={`rounded-md  p-2 px-4 transition-colors flex-center ${className}
                  ${buttonSize} ${color !== 'none' && bgColor} ${border} `}
    >
      {children}
    </button>
  );
}
