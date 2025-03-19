import { createContext } from "react";

export const VisibilityContext = createContext({
  visible: false,
  open: () => {},
  close: () => {},
  toggle: () => {},
});
