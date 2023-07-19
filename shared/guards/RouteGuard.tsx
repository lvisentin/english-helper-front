'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ReactElement, useEffect, useState } from 'react';
import { userService } from '../services/user/UserService';

export interface RouteGuardProps {
  children: ReactElement;
}

const RouteGuard = ({ children }: RouteGuardProps) => {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function checkUser() {
    userService
      .getCurrentUser()
      .then(({ data }) => {
        if (!data.user) {
          setAuthorized(false);
          router.push('/login');
        } else {
          setAuthorized(true);
        }
      })
      .catch(() => {
        console.error('UNAUTHORIZED USER');
        setAuthorized(false);
        router.push('/login');
      });
  }

  useEffect(() => {
    checkUser();
  }, [router, pathname, searchParams]);

  return authorized ? (
    children
  ) : (
    <div className={'w-full h-full flex flex-col'}>
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  );
};

export default RouteGuard;
