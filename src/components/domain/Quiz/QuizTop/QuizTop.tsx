import { ProgressBar } from '@components/common';

interface QuizTopProps {
  title: string;
  nowQuizPage: number;
  maxQuizPage?: number;
  nowTimer?: string;
  onlyTitle?: boolean;
}

export function QuizTop({ title, nowQuizPage, maxQuizPage = 0, nowTimer = '', onlyTitle = false }: QuizTopProps) {
  const questionNum = `Q${nowQuizPage}. `;

  return (
    <>
      {!onlyTitle && (
        <div className="flex w-full flex-col items-end gap-0">
          <ProgressBar
            now={nowQuizPage}
            max={maxQuizPage}
          />
          <div className="flex w-full justify-end">{nowTimer}</div>
        </div>
      )}
      <h1
        className="w-full text-xl font-bold"
        dangerouslySetInnerHTML={{ __html: questionNum + title }}
      ></h1>
    </>
  );
}
