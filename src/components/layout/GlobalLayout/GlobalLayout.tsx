import type { PropsWithChildren } from 'react';

export function GlobalLayout({ children }: PropsWithChildren) {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div
        className={`h-full w-full 
            max-w-screen-sm flex flex-col
            md: border md:border-l-gray-200 md:border-r-gray-200 md:rounded-md
            `}
      >
        {children}
      </div>
    </div>
  );
}
