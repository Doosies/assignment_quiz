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

      <main className="flex flex-col md:flex-row w-full h-full">
        <PieChart
          className="px-10 pt-10 text-4xs font-bold w-full md:w-2/3 "
          data={pieChartDatas}
          label={data => data.dataEntry.percentage.toFixed(2) + '%'}
        />
        <section className="w-full md:w-1/2 p-4 flex-center flex-col gap-4 text-lg ">
          {resultInformations.map(({ title, value }, index) => (
            <div
              key={index}
              className="flex-center flex-col"
            >
              <p className="font-bold">{title}</p>
              <p>{value}</p>
            </div>
          ))}
        </section>
      </main>

      <div className="flex flex-col gap-2 flex-1 p-4">
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
      </div>
    </PageLayout>
  );
}
