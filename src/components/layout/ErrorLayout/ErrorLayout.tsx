interface ErrorLayoutProps {
  message: string;
  children: React.ReactNode;
}

export function ErrorLayout({ message, children }: ErrorLayoutProps) {
  return (
    <div className="h-[85%] flex-col gap-4 flex-center">
      <p>{message}</p>
      <div className="flex-col gap-2 flex-center">{children}</div>
    </div>
  );
}
