import { Children, ReactNode } from 'react';

interface LoginSplitLayoutProps {
  children?: ReactNode[];
}

export default function LoginSplitLayout({ children }: LoginSplitLayoutProps) {
  const [first, second] = Children.toArray(children);
  return (
    <>
      <main className={'flex h-fit sm:h-screen'}>
        <div
          className={
            'px-6 py-8 flex w-full justify-center items-center lg:w-1/2'
          }
        >
          {first}
        </div>
        <div
          className={
            'hidden justify-center items-center lg:flex px-10 lg:w-1/2 lg:h-screen lg:bg-[#1e1e2d]'
          }
        >
          {second}
        </div>
      </main>
    </>
  );
}
