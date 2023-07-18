'use client';

import { userService } from '@/shared/services/user/UserService';
import {
  faArrowRightFromBracket,
  faListUl,
  faMicrophoneLines,
  faPen,
  faQuestion,
  faReceipt,
  faRobot,
  IconLookup,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
export interface MenuItem {
  icon: IconLookup;
  text: string;
  route: string;
}

const menuItems: MenuItem[] = [
  {
    icon: faListUl,
    text: 'Home',
    route: '/internal/dashboard',
  },
  {
    icon: faPen,
    text: 'Writing',
    route: '/internal/writing',
  },
  {
    icon: faMicrophoneLines,
    text: 'Speaking',
    route: '/internal/speaking',
  },
  {
    icon: faRobot,
    text: 'Assistant',
    route: '/internal/assistant',
  },
  {
    icon: faReceipt,
    text: 'Minha Assinatura',
    route: '/internal/subscription',
  },
];

const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const { push } = useRouter();

  function logout() {
    userService.signOut().then(() => {
      push('/login');
    });
  }

  return (
    <nav
      className={
        'bg-base-100 min-w-320 w-80 flex flex-col h-screen justify-between shadow-sm'
      }
    >
      <div className={'flex align-items-center pt-8 px-8'}>
        <img
          src={'https://placehold.it/50x50'}
          alt={'Avatar'}
          className="rounded-full"
        />
        <div className={'hidden md:block ml-4'}>
          <p className={'truncate font-mono'}>Lucas Visentin</p>
          <p className={'truncate font-mono'}>lvise.batista@gmail.com</p>
        </div>
      </div>

      <ul className="menu menu-sm lg:menu-md px-4 py-4 mb-auto">
        <li className="my-4"></li>
        {menuItems.map((menuItem, key) => (
          <li key={key}>
            <Link
              href={menuItem.route}
              data-sveltekit-preload-data="hover"
              className={
                pathname === menuItem.route
                  ? 'active h-full text-white p-4'
                  : 'h-full p-4'
              }
            >
              <FontAwesomeIcon icon={menuItem.icon} className={`h-5 w-5`} />
              <span className="hidden md:block undefined">{menuItem.text}</span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="footer w-full">
        <ul className="menu menu-sm lg:menu-md px-4 py-4 w-full">
          <li className="my-4"></li>
          <li className="w-full">
            <Link
              href="/"
              data-sveltekit-preload-data="hover"
              className={'h-full p-4'}
            >
              <FontAwesomeIcon icon={faQuestion} className={'h-5 w-5'} />
              <span className="hidden md:block undefined">Help</span>
            </Link>
          </li>
          <li className="w-full">
            <Link
              href="/"
              data-sveltekit-preload-data="hover"
              className={'h-full p-4'}
            >
              <FontAwesomeIcon
                icon={faArrowRightFromBracket}
                className={'h-5 w-5'}
              />
              <span className="hidden md:block undefined">Logout</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
