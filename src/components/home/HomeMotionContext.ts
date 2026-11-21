import { createContext } from 'react';

export const HomeMotionContext = createContext({
  paused: false,
  togglePaused: () => {},
});
