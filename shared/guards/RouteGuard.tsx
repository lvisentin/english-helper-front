'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ReactElement, useEffect, useState } from 'react';
import { useCurrentUser } from '../hooks/useCurrentUser';

export interface RouteGuardProps {
  children: ReactElement;
}

const RouteGuard = ({ children }: RouteGuardProps) => {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const user = useCurrentUser();

  useEffect(() => {
    const authCheck = () => {
      if (!user) {
        setAuthorized(false);
        router.push('/login');
      } else {
        setAuthorized(true);
      }
    };

    authCheck();
  }, [router, pathname, searchParams, user]);

  return authorized ? (
    children
  ) : (
    <div className={'w-full h-full flex flex-col'}>
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  );
};

export default RouteGuard;
