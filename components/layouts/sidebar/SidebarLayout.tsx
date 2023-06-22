import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './SidebarLayout.module.scss';

export interface ISidebarLayout {}

const SidebarLayout: React.FC<ISidebarLayout> = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.user}>
        <img src="https://placehold.it/50x50" alt="Avatar" width={50} />
        <div className={styles.userInfo}>
          <p className={styles.userName}>Lucas Visentin</p>
          <p className={styles.userEmail}>lvise.batista@gmail.com</p>
        </div>
      </div>

      <div className={styles.navBody}>
        <ul className={styles.itemsList}>
          <li>
            <FontAwesomeIcon icon={faHouse} />
            <span>Home</span>
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
