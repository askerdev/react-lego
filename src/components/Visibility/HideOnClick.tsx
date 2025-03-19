import {
  Children,
  cloneElement,
  FC,
  memo,
  MouseEventHandler,
  ReactElement,
  useContext,
  useMemo,
} from "react";
import { VisibilityContext } from "./context";

interface ChildrenProps {
  onClick?: MouseEventHandler;
}

interface Props {
  children: ReactElement<ChildrenProps>;
}

const HideOnClick: FC<Props> = ({ children }) => {
  const child = Children.only(children);
  const { close } = useContext(VisibilityContext);

  const childProps: ChildrenProps = useMemo(
    () => ({
      onClick: (e) => {
        child.props.onClick?.(e);
        close();
      },
    }),
    [child.props, close],
  );

  return cloneElement(child, childProps);
};

const MemoizedHideOnClick = memo(HideOnClick);
MemoizedHideOnClick.displayName = "HideOnClick";

export { MemoizedHideOnClick as HideOnClick };
