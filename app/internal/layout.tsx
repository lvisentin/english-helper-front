import HelpButton from '@/components/HelpButton/HelpButton';
import Sidebar from '@/components/Sidebar/Sidebar';
import Head from 'next/head';
import React from 'react';

export interface IInternalLayout {
  children: React.ReactNode;
}

const InternalLayout: React.FC<IInternalLayout> = ({ children }) => {
  return (
    <>
      <HelpButton></HelpButton>
      <Head>
        <title>Primary Layout Example</title>
      </Head>
      <div className={`main flex flex-row h-full w-full`}>
        <Sidebar />
        <main className={'p-8 flex-grow bg-slate-100 overflow-auto'}>
          {children}
        </main>
      </div>
    </>
  );
};

export default InternalLayout;
