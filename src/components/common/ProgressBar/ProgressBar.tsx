interface ProgressBarProps {
  now: number;
  max: number;
  onlyText?: boolean;
  className?: string;
}

export function ProgressBar({ now, max, onlyText, className }: ProgressBarProps) {
  const nowIsbiggerThanHalf = now > Math.floor(max / 2);

  return (
    <div className={`relative h-8 w-full flex-center ${className}`}>
      <div className={`absolute w-full flex-center ${!onlyText && nowIsbiggerThanHalf ? 'text-white' : ''}`}>
        {now} / {max}
      </div>
      {!onlyText && (
        <progress
          className="progress-bar h-full w-full"
          value={now}
          max={max}
        />
      )}
    </div>
  );
}
