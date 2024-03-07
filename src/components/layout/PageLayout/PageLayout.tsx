import { TopBar } from '@components/common';

interface PageLayoutProps {
  children: React.ReactNode;
  title?: string;
  noTopBar?: boolean;
}

export function PageLayout({ title, children, noTopBar }: PageLayoutProps) {
  return (
    <div className="flex flex-col h-screen">
      {!noTopBar && <TopBar title={title ?? ''} />}
      <main className="h-full w-ful p-4">{children}</main>
    </div>
  );
}
