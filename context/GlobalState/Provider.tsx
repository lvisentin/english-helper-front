import { GlobalStateContext } from '@/context/GlobalState/Context';
import { ReactNode, Reducer, useReducer } from 'react';
import { GlobalState, GlobalStateAction } from '@/context/GlobalState/types';
import globalStateReducer from '@/context/GlobalState/reducers/globalStateReducer';

const initialState: GlobalState = { user: { name: 'old State' } };

export const GlobalStateProvider = ({ children }: { children: ReactNode }) => {
  const [globalState, dispatch] = useReducer<
    Reducer<GlobalState, GlobalStateAction>
  >(mainReducer, initialState);
  function mainReducer(
    globalState: GlobalState,
    action: GlobalStateAction
  ): GlobalState {
    // reducers go here for further filtering of the state
    return globalStateReducer(globalState, action);
  }

  return (
    <GlobalStateContext.Provider
      value={{
        globalState,
        dispatch,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};
