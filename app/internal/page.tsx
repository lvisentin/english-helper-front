'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function InternalPage() {
  const { push } = useRouter();
  useEffect(() => {
    push('/internal/dashboard');
  }, []);

  return <h1>internal</h1>;
}
