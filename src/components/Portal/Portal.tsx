import { FC, PropsWithChildren } from "react";
import { createPortal } from "react-dom";

export const Portal: FC<PropsWithChildren> = ({ children }) =>
  createPortal(children, document.body);
