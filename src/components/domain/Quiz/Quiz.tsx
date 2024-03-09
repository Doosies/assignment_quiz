import type { PropsWithChildren } from 'react';

import { QuizBody, QuizTop } from './';

export function Quiz({ children }: PropsWithChildren) {
  return <div className="p-4 w-full flex flex-col items-center">{children}</div>;
}

Quiz.Top = QuizTop;
Quiz.Body = QuizBody;
