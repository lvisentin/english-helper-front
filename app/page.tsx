'use client';
import { useContext } from 'react';
import { GlobalStateContext } from '@/context/GlobalState/Context';

export default function HomePage() {
  const { globalState, dispatch } = useContext(GlobalStateContext);

  const updateGlobalState = () => dispatch({ type: 'type1' });

  return (
    <section>
      <h1>current branch: develop</h1>
      <h2 className={'p-10 pl-0'}>{globalState?.user?.name}</h2>
      <button className={'btn btn-primary'} onClick={updateGlobalState}>
        show state
      </button>
      <button className={'btn btn-secondary'} onClick={updateGlobalState}>
        show state
      </button>
    </section>
  );
}
