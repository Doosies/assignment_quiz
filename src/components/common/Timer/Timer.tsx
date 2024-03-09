interface TimerProps {
  time: string;
}

export function Timer({ time }: TimerProps) {
  return <span className="p-4">{time}</span>;
}
