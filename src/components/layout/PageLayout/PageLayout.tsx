interface PageLayoutProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

export function PageLayout({ children, className }: PageLayoutProps) {
  return (
    <div className="flex flex-col h-screen">
      <div className={`relative h-full w-ful ${className}`}>{children}</div>
    </div>
  );
}
