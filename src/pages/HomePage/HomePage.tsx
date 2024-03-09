import { useNavigate } from 'react-router-dom';

import { Button } from '@components/common';
import { PageLayout } from '@components/layout';

export function HomePage() {
  const navigate = useNavigate();

  const goQuizPage = () => navigate('/quiz');
  const goWrongNotePage = () => navigate('/wrong-note');

  return (
    <PageLayout className="flex-center">
      <div className="w-full max-w-sm h-full flex-col flex-center gap-4 ">
        <Button
          onClick={goQuizPage}
          size="full"
        >
          퀴즈 풀기
        </Button>

        <Button
          onClick={goWrongNotePage}
          color="secondary"
          size="full"
        >
          오답 노트
        </Button>
      </div>
    </PageLayout>
  );
}
