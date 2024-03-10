import type { PropsWithChildren } from 'react';

import { QuizBody, QuizBottom, QuizTop } from './';

export function Quiz({ children }: PropsWithChildren) {
  return <section className="flex w-full flex-col items-center p-4">{children}</section>;
}

Quiz.Top = QuizTop;
Quiz.Body = QuizBody;
Quiz.Bottom = QuizBottom;
