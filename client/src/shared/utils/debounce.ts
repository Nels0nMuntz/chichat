type Timer = ReturnType<typeof setTimeout>;

interface FunctionWithArguments {
  (...args: any[]): any;
}

interface DebouncedFunction<F extends FunctionWithArguments> {
  (...args: Parameters<F>): Promise<ReturnType<F>>;
}

interface DebounceReturn<F extends FunctionWithArguments>
  extends Array<DebouncedFunction<F> | (() => void)> {
  0: (...args: Parameters<F>) => Promise<ReturnType<F>>;
  1: () => void;
}

export function debounce<F extends FunctionWithArguments>(
  fn: F,
  delay: number,
): DebounceReturn<F> {
  let timer: Timer;

  const debouncedFn: DebouncedFunction<F> = (...args) => {
    return new Promise((resolve) => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        resolve(fn(args));     
      }, delay);
    });
  };
  const cancel = () => clearTimeout(timer);
  return [debouncedFn, cancel];
}
