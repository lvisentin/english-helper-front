import PrimaryLayout from '@/components/layouts/primary/PrimaryLayout';
import SidebarLayout from '@/components/layouts/sidebar/SidebarLayout';
import styles from './SpeakingDashboard.module.scss';

const SpeakingDashboard = () => {
  return (
    <div className={styles.content}>
      <article className="prose">
        <h2>Speaking - Análises Recebidas</h2>
      </article>
    </div>
  );
};

export default SpeakingDashboard;

SpeakingDashboard.getLayout = (page) => {
  return (
    <PrimaryLayout>
      <SidebarLayout />
      {page}
    </PrimaryLayout>
  );
};
