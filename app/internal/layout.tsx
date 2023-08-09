import HelpButton from '@/components/HelpButton/HelpButton';
import Sidebar from '@/components/Sidebar/Sidebar';
import React from 'react';
import styles from './layout.module.scss';

export interface IInternalLayout {
  children: React.ReactNode;
}

const InternalLayout: React.FC<IInternalLayout> = ({ children }) => {
  return (
    <>
      <HelpButton></HelpButton>
      <div className={`main flex flex-row h-full w-full`}>
        <Sidebar />

        <main
          className={`p-8 flex-grow bg-slate-100 overflow-auto ${styles.main}`}
        >
          {children}
        </main>
      </div>
    </>
  );
};
export default InternalLayout;
