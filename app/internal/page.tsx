'use client';

import Loading from '@/shared/components/Loading/Loading';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function InternalPage() {
  const { push } = useRouter();
  useEffect(() => {
    push('/internal/dashboard');
  }, []);

  return <Loading />;
}
