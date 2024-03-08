import { TopBar } from '@components/common';

interface PageLayoutProps {
  children: React.ReactNode;
  title?: string;
  noTopBar?: boolean;
  className?: string;
}

export function PageLayout({ title, children, noTopBar, className }: PageLayoutProps) {
  return (
    <div className="flex flex-col h-screen">
      {!noTopBar && <TopBar title={title ?? ''} />}
      <main className={`h-full w-ful p-4 ${className}`}>{children}</main>
    </div>
  );
}
