import { useTimer } from '@business/hooks';

export function Home() {
  const timer = useTimer();

  return <div>{timer}</div>;
}
