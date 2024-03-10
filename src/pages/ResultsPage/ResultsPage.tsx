import { useLocation } from 'react-router-dom';

import { Button, PieChart, TopBar } from '@components/common';
import { PageLayout } from '@components/layout';

import { useResultPage } from '@hooks/result';

export function ResultsPage() {
  const { state }: { state: ResultPageLocationState } = useLocation();

  const { pieChartDatas, resultInformations, goHome, saveWrongNote } = useResultPage(state);

  return (
    <PageLayout className="flex flex-col ">
      <TopBar title="Results" />

      <main className="flex h-full w-full flex-col md:flex-row">
        <PieChart
          className="w-full px-10 pt-10 text-4xs font-bold md:w-2/3 "
          data={pieChartDatas}
          label={data => data.dataEntry.percentage.toFixed(2) + '%'}
        />
        <section className="w-full flex-col gap-4 p-4 text-lg flex-center md:w-1/2 ">
          {resultInformations.map(({ title, value }, index) => (
            <div
              key={index}
              className="flex-col flex-center"
            >
              <p className="font-bold">{title}</p>
              <p>{value}</p>
            </div>
          ))}
        </section>
      </main>

      <section className="flex flex-1 flex-col gap-2 p-4">
        <Button
          size="full"
          onClick={saveWrongNote}
        >
          오답노트 저장하기
        </Button>
        <Button
          size="full"
          color="secondary"
          onClick={goHome}
        >
          홈으로 가기
        </Button>
      </section>
    </PageLayout>
  );
}
