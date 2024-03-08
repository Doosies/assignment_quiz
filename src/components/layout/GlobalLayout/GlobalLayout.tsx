import type { PropsWithChildren } from 'react';

export function GlobalLayout({ children }: PropsWithChildren) {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center md:p-4">
      <div
        className={`h-full w-full 
            max-w-screen-sm flex flex-col
            md:border md:rounded-md
            `}
      >
        {children}
      </div>
    </div>
  );
}
