import { GlobalStateContext } from '@/context/GlobalState/Context';
import { GlobalStateProvider } from '@/context/GlobalState/Provider';
import { useContext, useEffect } from 'react';
import PrimaryLayout from '../components/layouts/primary/PrimaryLayout';
import SidebarLayout from '../components/layouts/sidebar/SidebarLayout';
import styles from '../styles/Home.module.scss';
import { NextPageWithLayout } from './page';

const Home: NextPageWithLayout = () => {
  const { globalState, dispatch } = useContext(GlobalStateContext);

  const updateGlobalState = () => dispatch({ type: 'type1' });

  useEffect(() => {
    // writingService.getWritings();
  }, []);

  return (
    <section className={styles.main}>
      <h1 className={styles.title}>current branch: develop</h1>
      <h2 className={'p-10 pl-0'}>{globalState?.user?.name}</h2>
      <button className={'btn'} onClick={updateGlobalState}>
        show state
      </button>
    </section>
  );
};

export default Home;

Home.getLayout = (page) => {
  return (
    <GlobalStateProvider>
      <PrimaryLayout>
        <SidebarLayout />
        {page}
      </PrimaryLayout>
    </GlobalStateProvider>
  );
};
