type Listener<T> = (context: T) => void;

type SetStateAction<S> = S | ((prevState: S) => S);

export class SuperSimpleStorage<T> {
  #state: T;
  #observers = new Set<Listener<T>>();

  constructor(initialState: T) {
    this.#state = initialState;
  }

  #notify = () => {
    this.#observers.forEach((listener) => listener(this.getSnapshot()));
  };

  setState = (valueOrCallback: SetStateAction<T>) => {
    this.#state =
      valueOrCallback instanceof Function
        ? valueOrCallback(this.getSnapshot())
        : valueOrCallback;
    this.#notify();
  };

  getSnapshot = () => {
    return this.#state;
  };

  subscribe = (cb: Listener<T>) => {
    if (!this.#observers.has(cb)) {
      this.#observers.add(cb);
    }

    return () => {
      this.#observers.delete(cb);
    };
  };
}
