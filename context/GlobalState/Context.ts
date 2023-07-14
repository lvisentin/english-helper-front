'use client';

import { createContext } from 'react';
import { GlobalStateContextType } from '@/context/GlobalState/types';

export const GlobalStateContext = createContext<GlobalStateContextType>({
  globalState: {},
  dispatch: () => null,
});
