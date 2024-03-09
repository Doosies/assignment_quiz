import { ErrorBoundary } from 'react-error-boundary';

import { TopBar } from '@components/common';
import { APIErrorBoundary } from '@components/error/ErrorBoundary';
import { PageLayout } from '@components/layout';
import { TakeQuiz } from '@components/page/QuizPage';

import { useTimer } from '@hooks/common';

export function QuizPage() {
  const timer = useTimer();

  return (
    <PageLayout>
      <TopBar title="Quiz" />
      <ErrorBoundary FallbackComponent={APIErrorBoundary}>
        <TakeQuiz timer={timer} />
      </ErrorBoundary>
    </PageLayout>
  );
}
