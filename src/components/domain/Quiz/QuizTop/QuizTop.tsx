import { ProgressBar, Timer } from '@components/common';

interface QuizTopProps {
  title: string;
  nowQuizPage: number;
  maxQuizPage: number;
  nowTimer: string;
  onlyTitle?: boolean;
}

export function QuizTop({ title, nowQuizPage, maxQuizPage, nowTimer, onlyTitle }: QuizTopProps) {
  const questionNum = `Q${nowQuizPage}. `;

  return (
    <>
      {!onlyTitle && (
        <div className="w-full flex flex-col items-end gap-0">
          <ProgressBar
            now={nowQuizPage}
            max={maxQuizPage}
          />
          <div className="w-full flex justify-end">{nowTimer}</div>
        </div>
      )}
      <h1
        className="w-full text-xl font-bold"
        dangerouslySetInnerHTML={{ __html: questionNum + title }}
      ></h1>
    </>
  );
}
