import { ProgressBar, Timer } from '@components/common';

interface QuizTopProps {
  title: string;
  nowQuizPage: number;
  maxQuizPage: number;
  nowTimer: string;
}

export function QuizTop({ title, nowQuizPage, maxQuizPage, nowTimer }: QuizTopProps) {
  return (
    <>
      <h1 className="w-full text-2xl font-bold">
        Q{nowQuizPage}. {title}
      </h1>
      <div className="w-full flex flex-col items-end">
        <ProgressBar
          now={nowQuizPage}
          max={maxQuizPage}
        />
        <Timer time={nowTimer} />
      </div>
    </>
  );
}
