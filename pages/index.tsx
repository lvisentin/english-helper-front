import { GlobalStateContext } from '@/context/GlobalState/Context';
import { GlobalStateProvider } from '@/context/GlobalState/Provider';
import { useContext } from 'react';
import PrimaryLayout from '../components/layouts/primary/PrimaryLayout';
import SidebarLayout from '../components/layouts/sidebar/SidebarLayout';
import styles from '../styles/Home.module.scss';
import { NextPageWithLayout } from './page';
import HelpButton from '@/components/HelpButton/HelpButton';


const Home: NextPageWithLayout = () => {
  const { globalState, dispatch } = useContext(GlobalStateContext);

  const updateGlobalState = () => dispatch({ type: 'type1' });

  return (
    <section className={styles.main}>
      <h1 className={styles.title}>current branch: develop</h1>
      <h2 className={'p-10 pl-0'}>{globalState?.user?.name}</h2>
      <button className={'btn btn-primary'} onClick={updateGlobalState}>
        show state
      </button>
      <button className={'btn btn-secondary'} onClick={updateGlobalState}>
        show state
      </button>
      <HelpButton/>

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
