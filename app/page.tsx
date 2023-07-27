'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function HomePage() {
  const { push } = useRouter();

  useEffect(() => {
    push('/internal');
  }, []);
  return <p></p>;
}
