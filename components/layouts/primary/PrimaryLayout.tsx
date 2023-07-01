import Head from 'next/head';
import React from 'react';
import styles from './PrimaryLayout.module.scss';
import Sidebar from '@/components/Sidebar/Sidebar';

export interface IPrimaryLayout {
  children: React.ReactNode;
}

const PrimaryLayout: React.FC<IPrimaryLayout> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Primary Layout Example</title>
      </Head>
      <div className={styles.main}>
        <Sidebar />
        <main className={'p-8 flex-grow'}>{children}</main>
      </div>
    </>
  );
};

export default PrimaryLayout;
