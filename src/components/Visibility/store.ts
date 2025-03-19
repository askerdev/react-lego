import { useCallback, useMemo, useState, useSyncExternalStore } from "react";
import { SuperSimpleStorage } from "../../packages/sss";

interface State {
  visible: boolean;
}

class VisibilityStore extends SuperSimpleStorage<State> {
  constructor(initialState: State) {
    super(initialState);
  }
}

interface HookProps {
  name?: string;
  initialState?: Partial<State>;
}

const createVisibilityStoreHook = (defaultState: State) => {
  const stores = new Map<string, VisibilityStore>();

  const createStore = (initialState: Partial<State> = {}) =>
    new VisibilityStore({ ...defaultState, ...initialState });

  const getStore = (
    name: string,
    initialState: Partial<State> = {},
  ): VisibilityStore =>
    (stores.has(name)
      ? stores.get(name)
      : stores
          .set(name, createStore(initialState))
          .get(name)) as VisibilityStore;

  const useVisibility = ({ name, initialState }: HookProps) => {
    const [store] = useState(() =>
      name ? getStore(name, initialState) : createStore(initialState),
    );

    const value = useSyncExternalStore(store.subscribe, store.getSnapshot);

    const open = useCallback(
      () => store.setState((prev) => ({ ...prev, visible: true })),
      [store],
    );
    const close = useCallback(
      () => store.setState((prev) => ({ ...prev, visible: false })),
      [store],
    );
    const toggle = useCallback(
      () => store.setState((prev) => ({ ...prev, visible: !prev.visible })),
      [store],
    );

    return useMemo(
      () => ({
        ...value,
        open,
        close,
        toggle,
      }),
      [close, open, toggle, value],
    );
  };

  return useVisibility;
};

export const useVisibility = createVisibilityStoreHook({ visible: false });
