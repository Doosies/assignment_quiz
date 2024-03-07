import { Button } from '..';

import { useNavigate } from 'react-router-dom';

interface TopBarProps {
  title: string;
}

export function TopBar({ title }: TopBarProps) {
  const navigate = useNavigate();

  const goHomePage = () => {
    navigate('/');
  };

  return (
    <header className="flex items-center bg-paper p-4 gap-4">
      <Button
        className="text-xs"
        onClick={goHomePage}
        onlyText
      >
        홈으로
      </Button>
      <span>{title}</span>
    </header>
  );
}