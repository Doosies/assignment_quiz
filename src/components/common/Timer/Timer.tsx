import { useTimer } from '@business/hooks';

interface TimerProps {
  startMS?: number;
}

export function Timer({ startMS = 0 }: TimerProps) {
  const timer = useTimer(startMS);

  return (
    <div className="align-middle p-2">
      <span>{timer}</span>
    </div>
  );
}
