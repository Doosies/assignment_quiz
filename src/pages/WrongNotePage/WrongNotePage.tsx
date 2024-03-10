import { Button, TopBar } from '@components/common';
import { Quiz } from '@components/domain/Quiz';
import { PageLayout } from '@components/layout';

import { useWrongNotePage } from '@hooks/wrongNote';

export function WrongNotePage() {
  const { nowPageNum, nowQuizPageData, isFistPage, isLastPage, goNextPage, goPrevPage } = useWrongNotePage();

  return (
    <PageLayout>
      <TopBar title="WrongNote" />
      <Quiz>
        <Quiz.Top
          title={nowQuizPageData.question}
          nowQuizPage={nowPageNum + 1}
          onlyTitle
        />

        <Quiz.Body
          answers={nowQuizPageData.answers}
          correctAnswer={nowQuizPageData.correctAnswer}
          userAnswer={nowQuizPageData.userAnswer}
        />
        <Quiz.Bottom className="flex justify-between gap-2">
          <section className="flex-center">틀린 횟수: {nowQuizPageData.count}</section>
          <section className="flex justify-end gap-2">
            <Button
              onClick={goPrevPage}
              invisible={isFistPage}
            >
              이전 문항
            </Button>

            <Button
              onClick={() => {}}
              color="secondary"
            >
              문항 제거
            </Button>

            <Button
              onClick={goNextPage}
              invisible={isLastPage}
            >
              다음 문항
            </Button>
          </section>
        </Quiz.Bottom>
      </Quiz>
    </PageLayout>
  );
}
