import { Button } from '@components/common';
import { Quiz } from '@components/domain/Quiz';

import { useQuizFetch } from '@hooks/fetch';
import { useTakeQuiz } from '@hooks/quiz';

interface TakeQuizProps {
  timer: string;
}
export function TakeQuiz({ timer }: TakeQuizProps) {
  const { data } = useQuizFetch();

  const {
    nowQuizPage,
    maxQuizPage,
    selectedAnswer,
    nowQuizPageData,
    buttonAvailable,
    buttonLabel,
    changeSelectedAnswer,
    goNextQuizPage,
  } = useTakeQuiz({ quiz: data, timer });

  return (
    nowQuizPageData && (
      <Quiz>
        <Quiz.Top
          maxQuizPage={maxQuizPage}
          nowQuizPage={nowQuizPage + 1}
          title={nowQuizPageData.question}
          nowTimer={timer}
        />
        <Quiz.Body
          answers={nowQuizPageData.answers}
          correctAnswer={nowQuizPageData.correctAnswer}
          userAnswer={selectedAnswer}
          onClick={changeSelectedAnswer}
        />
        <Quiz.Bottom className="flex justify-end">
          {buttonAvailable && <Button onClick={goNextQuizPage}>{buttonLabel}</Button>}
        </Quiz.Bottom>
      </Quiz>
    )
  );
}
