import { isAxiosError } from 'axios';

import type { FallbackProps } from 'react-error-boundary';
import { useNavigate } from 'react-router-dom';

import { Button } from '@components/common';
import { ErrorLayout } from '@components/layout/ErrorLayout';

export function APIErrorBoundary({ error, resetErrorBoundary }: FallbackProps) {
  const { response } = error;

  const navigate = useNavigate();

  const goHome = () => {
    resetErrorBoundary();
    navigate('/');
  };

  let message = '알수없는 에러가 발생했습니다.';

  if (response?.data?.response_code === 5) {
    message = '5초에 한번 요청할 수 있습니다. 잠시 후 다시 시도해주세요.';
  }

  if (!isAxiosError(error)) return;

  return (
    <ErrorLayout message={message}>
      <Button
        onClick={resetErrorBoundary}
        size="lg"
      >
        다시 시도
      </Button>
      <Button
        onClick={goHome}
        size="lg"
        color="secondary"
      >
        홈으로
      </Button>
    </ErrorLayout>
  );
}
