import { FC, memo, useContext, useEffect } from "react";
import { VisibilityContext } from "./context";

interface Props {
  keyName: string;
}

const HideOnKeyDown: FC<Props> = ({ keyName }) => {
  const { close } = useContext(VisibilityContext);

  useEffect(() => {
    const controller = new AbortController();

    window.addEventListener(
      "keydown",
      (e) => {
        if (e.key === keyName) close();
      },
      controller,
    );

    return () => {
      controller.abort();
    };
  }, [keyName, close]);

  return null;
};

const MemoizedHideOnKeyDown = memo(HideOnKeyDown);
MemoizedHideOnKeyDown.displayName = "HideOnKeyDown";

export { MemoizedHideOnKeyDown as HideOnKeyDown };
