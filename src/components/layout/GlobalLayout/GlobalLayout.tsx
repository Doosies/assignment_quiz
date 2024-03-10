import type { PropsWithChildren } from 'react';

export function GlobalLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center md:p-4">
      <div
        className={`flex h-full w-full max-w-screen-sm flex-col
                    md:max-h-[50vh] md:rounded-md md:border`}
      >
        {children}
      </div>
    </div>
  );
}
