import type { PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';

export function BottomBar({ children }: PropsWithChildren) {
  return <nav className="flex w-full justify-around items-center p-4 gap-2 rounded-md border-t">{children}</nav>;
}
BottomBar.Item = BottomBarItem;

interface BottomBarItemProps {
  to: string;
  label: string;
}
function BottomBarItem({ to, label }: BottomBarItemProps) {
  const navigate = useNavigate();

  const goToPage = () => {
    navigate(to);
  };
  return (
    <button
      className="button flex-1 "
      onClick={goToPage}
    >
      {label}
    </button>
  );
}
