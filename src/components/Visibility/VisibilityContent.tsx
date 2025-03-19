import {
  Children,
  cloneElement,
  FC,
  memo,
  ReactElement,
  useContext,
  useMemo,
} from "react";
import { VisibilityContext } from "./context";

export interface VisibilityContentProps {
  isVisibile?: boolean;
}

interface Props {
  children: ReactElement<VisibilityContentProps>;
}

const VisibilityContent: FC<Props> = ({ children }) => {
  const { visible } = useContext(VisibilityContext);

  const childrenProps = useMemo(() => ({ isVisibile: visible }), [visible]);

  return visible ? cloneElement(Children.only(children), childrenProps) : null;
};

const MemoizedVisibilityContent = memo(VisibilityContent);

export { MemoizedVisibilityContent as VisibilityContent };
