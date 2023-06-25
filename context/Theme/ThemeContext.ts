import { createContext } from 'react';
import { ThemeContextType, ThemeState } from './types';

const initialState: ThemeState = { theme: 'dark' };

export const ThemeContext = createContext<ThemeContextType>({
  theme: initialState,
  dispatch: () => null,
});
