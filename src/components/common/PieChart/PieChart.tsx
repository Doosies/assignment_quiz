import { PieChart as PieChartBase } from 'react-minimal-pie-chart';
import type { Data, LabelRenderFunction } from 'react-minimal-pie-chart/types/commonTypes';

export function PieChart({
  data,
  label,
  className,
}: {
  data: Data<{
    title: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: any;
    color: string;
  }>;
  label?: LabelRenderFunction<{
    title: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: any;
    color: string;
  }>;
  className?: string;
}) {
  return (
    <section className={className}>
      <PieChartBase
        data={data}
        label={label}
        labelPosition={data.length > 1 ? 50 : 0}
        startAngle={-90}
        animate
      />
    </section>
  );
}
