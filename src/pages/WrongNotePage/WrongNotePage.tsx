import { TopBar } from '@components/common';
import { PageLayout } from '@components/layout';
import { WrongNote } from '@components/page/WrongNotePage/WrongNote';

export function WrongNotePage() {
  return (
    <PageLayout>
      <TopBar title="WrongNote" />
      <WrongNote />
    </PageLayout>
  );
}
