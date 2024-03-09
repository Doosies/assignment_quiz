interface ErrorLayoutProps {
  message: string;
  children: React.ReactNode;
}

export function ErrorLayout({ message, children }: ErrorLayoutProps) {
  return (
    <div className="h-[85%] flex-center flex-col gap-4">
      <p>{message}</p>
      <div className="flex-center flex-col gap-2">{children}</div>
    </div>
  );
}
