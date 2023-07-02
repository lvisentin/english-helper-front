import { Dispatch } from 'react';

export interface GlobalState {
  user?: {
    name: string;
  };
}

export interface GlobalStateContextType {
  globalState?: GlobalState;
  dispatch: Dispatch<GlobalStateAction>;
}

export type GlobalStateAction =
  | { type: 'type1' }
  | {
      type: 'type2';
      payload: { user: { name: string; sex: 'male' | 'female' } };
    }
  | { type: 'type3'; payload: { itemId: string } };
