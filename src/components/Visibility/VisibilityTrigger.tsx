import {
  Children,
  cloneElement,
  FC,
  memo,
  MouseEvent,
  MouseEventHandler,
  ReactElement,
  useCallback,
  useContext,
  useMemo,
} from "react";
import { VisibilityContext } from "./context";

interface ChildrenProps {
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

interface Props {
  children: ReactElement<ChildrenProps, "button">;
}

const VisibilityTrigger: FC<Props> = ({ children }) => {
  const { toggle } = useContext(VisibilityContext);
  const { onClick: onChildrenClick } = children.props;

  const onClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      onChildrenClick?.(e);
      toggle();
    },
    [toggle, onChildrenClick],
  );

  const childrenProps = useMemo(
    () => ({
      onClick,
    }),
    [onClick],
  );

  return cloneElement(Children.only(children), childrenProps);
};

const MemoizedVisibilityTrigger = memo(VisibilityTrigger);
MemoizedVisibilityTrigger.displayName = "VisibilityTrigger";

export { MemoizedVisibilityTrigger as VisibilityTrigger };
