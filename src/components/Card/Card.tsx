import { FC, PropsWithChildren } from "react";
import styles from "./Card.module.css";

export const Card: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={styles.content} onClick={(e) => e.stopPropagation()}>
      {children}
    </div>
  );
};
