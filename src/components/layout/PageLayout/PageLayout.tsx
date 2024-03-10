interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function PageLayout({ children, className }: PageLayoutProps) {
  return (
    <div className="flex h-full flex-col">
      <div className={`relative h-full w-full ${className ? className : ''}`}>{children}</div>
    </div>
  );
}
