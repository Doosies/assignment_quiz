interface useQuizAnswerParams {
  answers: string[];
  correctAnswer: string;
  userAnswer?: string;
}

export function useQuizAnswer({ answers, correctAnswer, userAnswer }: useQuizAnswerParams) {
  const isCorrectAnswer = userAnswer === correctAnswer;

  const correctAnswerIndex = answers.indexOf(correctAnswer);
  const wrongAnswerIndex = answers.indexOf(userAnswer ?? '');

  const getAnswerColor = (idx: number) => {
    if (idx === correctAnswerIndex) return 'text-blue';
    if (idx === wrongAnswerIndex) return 'text-red';
    return '';
  };

  return { isCorrectAnswer, getAnswerColor, correctAnswerIndex, wrongAnswerIndex };
}
