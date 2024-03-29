import { useQuizAnswer } from '@hooks/quiz';

import { CORRECT_ANSWER_STRING, WRONG_ANSWER_STRING } from '@constants/quiz';

import { circledNumber } from '@utils/string';

interface QuizBodyProps {
  answers: string[];
  correctAnswer: string;
  userAnswer?: string;
  onClick?: (answer: string) => void;
}

export function QuizBody({ answers, correctAnswer, userAnswer, onClick }: QuizBodyProps) {
  const { getAnswerColor, correctAnswerIndex, isCorrectAnswer } = useQuizAnswer({ answers, correctAnswer, userAnswer });

  const clickAnswer = (answer: string) => {
    if (userAnswer) return;
    onClick?.(answer);
  };

  return (
    <>
      <ul className="mt-4 flex w-full flex-col gap-4">
        {answers.map((answer, idx) => (
          <li
            key={answer}
            className={`flex gap-2 break-all ${userAnswer ? '' : 'cursor-pointer hover:bg-paper-hover'}`}
            onClick={() => clickAnswer?.(answer)}
          >
            <span>{circledNumber(idx + 1)}</span>
            <span
              className={getAnswerColor(idx)}
              dangerouslySetInnerHTML={{ __html: answer }}
            />
          </li>
        ))}
      </ul>

      {userAnswer && (
        <p className="mt-4 w-full">
          {isCorrectAnswer
            ? CORRECT_ANSWER_STRING
            : `${WRONG_ANSWER_STRING} ${circledNumber(correctAnswerIndex + 1)} ${correctAnswer}`}
        </p>
      )}
    </>
  );
}
