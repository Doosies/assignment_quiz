import { useTimer } from '@business/hooks';

interface TimerProps {
  startMS?: number;
}

export function Timer({ startMS = 0 }: TimerProps) {
  const { hours, minutes, seconds } = useTimer(startMS);

  return (
    <div className="align-middle border p-2 rounded-md bg-slate-200 ">
      <span>{hours}</span> : <span>{minutes}</span> : <span>{seconds}</span>
    </div>
  );
}
