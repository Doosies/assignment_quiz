interface TimerProps {
  time: string;
}

export function Timer({ time }: TimerProps) {
  return (
    <div className="align-middle p-2 pr-4">
      <span>{time}</span>
    </div>
  );
}
