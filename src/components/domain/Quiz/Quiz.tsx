import type { PropsWithChildren } from 'react';

import { QuizBody, QuizTop } from './';

export function Quiz({ children }: PropsWithChildren) {
  return <section className="p-4 w-full flex flex-col items-center">{children}</section>;
}

Quiz.Top = QuizTop;
Quiz.Body = QuizBody;
