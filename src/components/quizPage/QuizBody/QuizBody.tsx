import { CORRECT_ANSWER_STRING, WRONG_ANSWER_STRING } from '@constants/quiz';

import { circledNumber } from '@utils/string';

import { useQuizAnswer } from './hooks/useQuizAnswer';

interface QuizBodyProps {
  answers: string[];
  correctAnswer: string;
  userAnswer?: string;
  onClick?: (answer: string) => void;
}

export function QuizBody({ answers, correctAnswer, userAnswer, onClick }: QuizBodyProps) {
  const { getAnswerColor, correctAnswerIndex, isCorrectAnswer } = useQuizAnswer({ answers, correctAnswer, userAnswer });

  const clickAnswer = (answer: string) => {
    if (!userAnswer) return;
    onClick?.(answer);
  };

  return (
    <div>
      <ul className="flex flex-col gap-4">
        {answers.map((answer, idx) => (
          <li
            key={answer}
            className={`p-2  flex gap-2 break-all ${userAnswer ? '' : 'cursor-pointer hover:bg-paper-hover'}`}
            onClick={() => clickAnswer?.(answer)}
          >
            <span>{circledNumber(idx + 1)}</span>
            <span className={getAnswerColor(idx)}>{answer}</span>
          </li>
        ))}
      </ul>

      {userAnswer && (
        <p className="mt-4">
          {isCorrectAnswer
            ? CORRECT_ANSWER_STRING
            : `${WRONG_ANSWER_STRING} ${circledNumber(correctAnswerIndex + 1)} ${correctAnswer}`}
        </p>
      )}
    </div>
  );
}
