interface ProgressBarProps {
  now: number;
  max: number;
  onlyText?: boolean;
  className?: string;
}

export function ProgressBar({ now, max, onlyText, className }: ProgressBarProps) {
  const nowIsbiggerThanHalf = now > Math.floor(max / 2);

  return (
    <div className={`relative h-8 flex-center w-full ${className}`}>
      <div className={`absolute flex-center w-full ${!onlyText && nowIsbiggerThanHalf ? 'text-white' : ''}`}>
        {now} / {max}
      </div>
      {!onlyText && (
        <progress
          className="progress-bar w-full h-full"
          value={now}
          max={max}
        />
      )}
    </div>
  );
}
