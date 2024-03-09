import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { TopBar } from '@components/common';
import { PageLayout } from '@components/layout';

import { isResultPageLocationState } from '@utils/typeGuard';

export function ResultsPage() {
  const { state } = useLocation();

  useEffect(() => {
    if (!isResultPageLocationState(state)) {
      throw new Error('잘못된 요청입니다.');
    }
  }, []);

  return (
    <>
      <PageLayout>
        <TopBar title="Results" />
      </PageLayout>
    </>
  );
}
