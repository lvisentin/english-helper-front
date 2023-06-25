import { ThemeState, ThemeStateAction } from '../types';

export const themeReducer = (state: ThemeState, action: ThemeStateAction) => {
  switch (action.type) {
    case 'LIGHTMODE':
      return { darkMode: false };
    case 'DARKMODE':
      return { darkMode: true };
    default:
      return state;
  }
};
