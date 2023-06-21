import { GlobalState, GlobalStateAction } from '@/context/GlobalState/types';

export default function globalStateReducer(globalState: GlobalState, action: GlobalStateAction): GlobalState {
  switch (action.type) {
    case 'type1': {
      return {
        ...globalState,
        user: {
          name: 'new State'
        }
      }
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}
