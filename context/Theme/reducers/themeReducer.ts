import { ThemeState, ThemeStateAction } from '../types';

export const themeReducer = (state: ThemeState, action: ThemeStateAction) => {
  console.log('action');
  switch (action.type) {
    case 'light':
      return { darkMode: false };
    case 'dark':
      return { darkMode: true };
    default:
      return state;
  }
};
