import { faLockOpen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './SidebarLayout.module.scss';

export interface ISidebarLayout {}

const SidebarLayout: React.FC<ISidebarLayout> = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.userInfo}>
        <img src="https://placehold.it/50x50" alt="Avatar" />
        <p className={styles.userName}>Lucas Visentin</p>
        <p className={styles.userEmail}>lvise.batista@gmail.com</p>
      </div>

      <div className={styles.navBody}>
        <ul className={styles.itemsList}>
          <li>
            <FontAwesomeIcon icon={faLockOpen} />
            Home
          </li>
        </ul>
      </div>

      {/* <input className={`${styles.input} input`} placeholder="Search..." />
      <Link href="/">Home </Link>
      <Link href="/about">About</Link>
      <Link href="/contact">Contact</Link> */}
    </nav>
  );
};

export default SidebarLayout;
