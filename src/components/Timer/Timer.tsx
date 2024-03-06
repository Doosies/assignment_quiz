import { useTimer } from '@business/hooks';

interface TimerProps {
  startMS?: number;
}

export function Timer({ startMS = 0 }: TimerProps) {
  const timer = useTimer(startMS);

  return (
    <div className="align-middle border p-2 rounded-md bg-slate-200 ">
      <span>{timer}</span>
    </div>
  );
}
