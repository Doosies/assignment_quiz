import { useEffect } from 'react';
import type { FallbackProps } from 'react-error-boundary';
import { useNavigate } from 'react-router-dom';

import { Button } from '@components/common';
import { ErrorLayout } from '@components/layout/ErrorLayout';

export function UnkownErrorBoundary({ error, resetErrorBoundary }: FallbackProps) {
  const navigate = useNavigate();

  const goHome = () => {
    resetErrorBoundary();
    navigate('/', { replace: true });
  };

  useEffect(() => {
    if (import.meta.env.MODE === 'development') {
      console.error(error);
    }
  }, []);

  return (
    <ErrorLayout message={error.message}>
      <Button
        onClick={goHome}
        size="lg"
      >
        홈으로
      </Button>
    </ErrorLayout>
  );
}
