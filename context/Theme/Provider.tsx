import { ReactNode, Reducer, useReducer } from 'react';
import { ThemeContext } from './ThemeContext';
import { ThemeState, ThemeStateAction } from './types';

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, dispatch] = useReducer<Reducer<ThemeState, ThemeStateAction>>(
    themeReducer,
    { darkMode: false }
  );

  function themeReducer(themeState: ThemeState, action: ThemeStateAction) {
    return themeReducer(themeState, action);
  }

  return (
    <ThemeContext.Provider value={{ theme, dispatch }}>
      {children}
    </ThemeContext.Provider>
  );
};
