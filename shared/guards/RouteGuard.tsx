import { useRouter } from 'next/router';
import { ReactElement, useEffect, useState } from 'react';
import { userService } from '../services/user/UserService';

export interface RouteGuardProps {
  children: ReactElement;
}

const RouteGuard = ({ children }: RouteGuardProps) => {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  const user = userService.getCurrentUser();

  useEffect(() => {
    const authCheck = () => {
      if (!user.isLoggedIn) {
        setAuthorized(false);
      } else {
        setAuthorized(true);
      }
    };

    authCheck();

    const preventAccess = () => setAuthorized(false);

    router.events.on('routeChangeStart', preventAccess);
    router.events.on('routeChangeComplete', authCheck);

    return () => {
      router.events.off('routeChangeStart', preventAccess);
      router.events.off('routeChangeComplete', authCheck);
    };
  }, [router, router.events, user]);

  return authorized ? (
    children
  ) : (
    <div className={'w-full h-full flex flex-col'}>
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  );
};

export default RouteGuard;
