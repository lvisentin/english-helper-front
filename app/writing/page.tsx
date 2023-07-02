import RouteGuard from '@/shared/guards/RouteGuard';
import Link from 'next/link';

export default function WritingPage() {
  return (
    <RouteGuard>
      <>
        <h1>Writing Page</h1>
        <button className={'btn btn-primary'}>
          <Link href={'/writing/new'}>New Writing</Link>
        </button>
      </>
    </RouteGuard>
  );
}
