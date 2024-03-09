import type { PropsWithChildren } from 'react';

interface QuizTopProps {
  className?: string;
}
export function QuizBottom({ className, children }: QuizTopProps & PropsWithChildren) {
  return <section className={`absolute bottom-0 w-full p-4 ${className}`}>{children}</section>;
}
