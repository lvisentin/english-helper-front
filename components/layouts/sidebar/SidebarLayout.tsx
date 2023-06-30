import {
  IconLookup,
  faArrowRightFromBracket,
  faListUl,
  faMicrophoneLines,
  faMoon,
  faPen,
  faQuestion,
  faReceipt,
  faRobot,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './SidebarLayout.module.scss';

export interface ISidebarLayout {}

export interface MenuItem {
  icon: IconLookup;
  text: string;
  route: string;
}

const SidebarLayout: React.FC<ISidebarLayout> = () => {
  function toggleTheme() {
    const isDarkMode = !!(
      document.documentElement.getAttribute('data-theme') === 'dark'
    );

    if (isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }

  const menuItems: MenuItem[] = [
    {
      icon: faListUl,
      text: 'Home',
      route: '/',
    },
    {
      icon: faPen,
      text: 'Writing',
      route: '/writing',
    },
    {
      icon: faMicrophoneLines,
      text: 'Speaking',
      route: '/speaking',
    },
    {
      icon: faRobot,
      text: 'Assistant',
      route: '/assistant',
    },
    {
      icon: faReceipt,
      text: 'Minha Assinatura',
      route: '/subscription',
    },
  ];

  const router = useRouter();

  return (
    <nav className={styles.nav}>
      <div className="navContent">
        <div className={styles.user}>
          <img src="https://placehold.it/50x50" alt="Avatar" width={50} />
          <div className={`${styles.userInfo} hidden md:block`}>
            <p className={styles.userName}>Lucas Visentin</p>
            <p className={styles.userEmail}>lvise.batista@gmail.com</p>
          </div>
        </div>

        <div className={styles.navBody}>
          <ul className={styles.itemsList}>
            {menuItems.map((menuItem, key) => (
              <Link href={menuItem.route} key={key}>
                <li
                  className={
                    router.pathname === menuItem.route ? styles.active : ''
                  }
                >
                  <FontAwesomeIcon
                    icon={menuItem.icon}
                    className={styles.icon}
                  />
                  <span className="hidden md:block">{menuItem.text}</span>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.navFooter}>
        <ul>
          <li className={styles.footerItem}>
            <FontAwesomeIcon icon={faQuestion} className={styles.icon} />
            <span>Help</span>
          </li>
          <li className={`${styles.footerItem} ${styles.itemBorder}`}>
            <FontAwesomeIcon
              icon={faArrowRightFromBracket}
              className={styles.icon}
            />
            <span>Logout</span>
          </li>
        </ul>

        <li className={`${styles.footerItem} ${styles.nightMode}`}>
          <FontAwesomeIcon icon={faMoon} className={styles.icon} />
          <span>Night mode</span>
          <input
            onClick={() => toggleTheme()}
            type="checkbox"
            className="toggle toggle-sm hidden md:block"
          />
        </li>
      </div>
    </nav>
  );
};

export default SidebarLayout;
