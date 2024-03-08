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
    <header className="flex items-center bg-paper p-4 gap-4 ">
      <Button
        onClick={goHomePage}
        color="secondary"
        size="xs"
      >
        홈으로
      </Button>
      <span className="text-2xl">{title}</span>
    </header>
  );
}
