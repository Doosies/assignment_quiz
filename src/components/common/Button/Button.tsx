interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  noBorder?: boolean;
  color?: 'primary' | 'secondary' | 'none';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'lg' | '2xl' | 'full';
  invisible?: boolean;
}

const buttonTypes = {
  primary: 'text-white bg-blue hover:bg-blue-hover',
  secondary: 'bg-white hover:bg-gray',
  none: '',
};

export function Button({
  children,
  onClick,
  className,
  noBorder,
  invisible = false,
  color = 'primary',
  size = 'md',
}: ButtonProps) {
  const buttonType = buttonTypes[color];
  const buttonSize = size === 'full' ? 'w-full' : `text-${size}`;
  const border = noBorder ? '' : 'border';
  const visible = invisible ? 'invisible' : '';

  return (
    <button
      onClick={onClick}
      className={`rounded-md p-2 px-4 transition-colors flex-center 
                  ${buttonSize} ${buttonType} ${border} ${visible} ${className} 
                `}
    >
      {children}
    </button>
  );
}
