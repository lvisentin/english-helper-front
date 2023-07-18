'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function HomePage() {
  const { push } = useRouter();

  useEffect(() => {
    push('/login');
  }, []);
  return <p></p>;
}
