import { FC, memo, PropsWithChildren } from "react";
import { VisibilityContext } from "./context";
import { useVisibility } from "./store";

interface Props extends PropsWithChildren {
  name?: string;
}

const VisibilityProvider: FC<Props> = ({ name, children }) => {
  const visibility = useVisibility({ name });

  return (
    <VisibilityContext.Provider value={visibility}>
      {children}
    </VisibilityContext.Provider>
  );
};

const MemoizedVisibilityProvider = memo(VisibilityProvider);
MemoizedVisibilityProvider.displayName = "VisibilityProvider";

export { MemoizedVisibilityProvider as VisibilityProvider };
