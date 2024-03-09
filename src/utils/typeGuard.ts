export function isResultPageLocationState(state: unknown): state is ResultPageLocationState {
  if (typeof state !== 'object' || state === null) {
    return false;
  }

  const locationState = state as ResultPageLocationState;

  if (!locationState?.timer || typeof locationState?.timer !== 'string') {
    return false;
  }

  const selectedAnswerList = locationState?.selectedAnswerList;
  const fiestSelectedAnswer = selectedAnswerList?.[0];

  if (
    !Array.isArray(selectedAnswerList) ||
    fiestSelectedAnswer?.question === undefined ||
    fiestSelectedAnswer?.answers === undefined ||
    fiestSelectedAnswer?.correctAnswer === undefined ||
    fiestSelectedAnswer?.userAnswer === undefined ||
    fiestSelectedAnswer?.isCorrect === undefined
  ) {
    return false;
  }

  return true;
}
