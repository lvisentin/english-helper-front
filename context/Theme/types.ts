import { Dispatch } from 'react';

export interface ThemeState {
  darkMode: boolean;
}
export interface ThemeContextType {
  theme: ThemeState;
  dispatch: Dispatch<ThemeStateAction>;
}

export type ThemeStateAction = { type: 'light' } | { type: 'dark' };
