import { Dispatch } from 'react';

export interface ThemeState {
  theme: 'light' | 'dark';
}

export interface ThemeContextType {
  theme: ThemeState;
  dispatch: Dispatch<ThemeStateAction>;
}

export type ThemeStateAction = { type: 'LIGHTMODE' } | { type: 'DARKMODE' };
