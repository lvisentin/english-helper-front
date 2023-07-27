'use client';

import { userService } from '@/shared/services/user/UserService';
import { UserWithoutSensitiveInfo } from '@/shared/services/user/UserService.model';
import {
  faArrowRightFromBracket,
  faListUl,
  faMicrophoneLines,
  faPen,
  faReceipt,
  faRobot,
  IconLookup,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
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
    route: '/internal/my-subscription',
  },
];

const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const { push } = useRouter();
  const [userData, setUserData] = useState<UserWithoutSensitiveInfo>();

  function logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setTimeout(() => {
      push('/login');
    }, 1000);
  }

  function getUserData() {
    const userDataResponse = userService.getUserData();
    if (userDataResponse) {
      setUserData(userDataResponse);
    }
  }

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <nav
      className={
        'bg-base-100 min-w-320 w-80 flex flex-col h-screen justify-between shadow-sm'
      }
    >
      <Image
        src="/eh-blue.svg"
        alt="English Helper Logo"
        width={100}
        height={100}
        className={'w-full pt-4 px-8'}
      />
      <div className={'flex align-items-center pt-8 px-8'}>
        <img
          src={'https://placehold.it/50x50'}
          alt={'Avatar'}
          className="rounded-full"
        />
        <div className={'hidden md:block ml-4'}>
          <p className={'truncate font-mono'}>{userData?.name}</p>
          <p className={'truncate font-mono'}>{userData?.email}</p>
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
            <button
              onClick={logout}
              data-sveltekit-preload-data="hover"
              className={'h-full p-4'}
            >
              <FontAwesomeIcon
                icon={faArrowRightFromBracket}
                className={'h-5 w-5'}
              />
              <span className="hidden md:block undefined">Logout</span>
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
