import type { PropsWithChildren } from 'react';

export function GlobalLayout({ children }: PropsWithChildren) {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div
        className={`h-full w-full 
            max-w-screen-sm flex flex-col
            lg:max-h-[900px] lg:border lg:border-gray-200 lg:rounded-md`}
      >
        {children}
      </div>
    </div>
  );
}
GlobalLayout.Main = Main;

function Main({ children }: PropsWithChildren) {
  return <main className="flex-1 w-full p-4">{children}</main>;
}
