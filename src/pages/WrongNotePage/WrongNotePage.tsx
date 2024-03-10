import { ErrorBoundary } from 'react-error-boundary';

import { TopBar } from '@components/common';
import { UnkownErrorBoundary } from '@components/error/ErrorBoundary';
import { PageLayout } from '@components/layout';
import { WrongNote } from '@components/page/WrongNotePage/WrongNote';

export function WrongNotePage() {
  return (
    <PageLayout>
      <TopBar title="WrongNote" />
      <ErrorBoundary FallbackComponent={UnkownErrorBoundary}>
        <WrongNote />
      </ErrorBoundary>
    </PageLayout>
  );
}
