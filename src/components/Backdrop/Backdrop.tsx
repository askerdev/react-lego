import { FC, MouseEventHandler, PropsWithChildren } from "react";
import styles from "./Backdrop.module.css";

interface Props extends PropsWithChildren {
  onClick?: MouseEventHandler;
}

export const Backdrop: FC<Props> = ({ onClick, children }) => {
  return (
    <div
      role="dialog"
      aria-modal="true"
      className={styles.backdrop}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
