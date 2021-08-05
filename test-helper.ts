type Join<K, P> = K extends string | number
  ? P extends string | number
    ? `${K}${'' extends P ? '' : '.'}${P}`
    : never
  : never;

type Prev = [never, 0, 1, 2, 3, 4, ...0[]];

type Paths<T, D extends number = 10> = [D] extends [never]
  ? never
  : T extends object
  ? {
      [K in keyof T]-?: K extends string | number
        ? `${K}` | Join<K, Paths<T[K], Prev[D]>>
        : never;
    }[keyof T]
  : '';

/* Utility function to mock currently unavailable methods in
'jest-chrome */

/**
 * Takes a path to a method of the Chrome API. Properties are accessed
 * via dot notation. Example:
 * ```
 * const scriptMock = mockForV3('scripting.executeScript')
 * ```
 * This will produce
 * ```
 * global.chrome.scripting.executeScript = jest.fn()
 * ```
 * The returned mock function above will mock
 * `scripting.executeScript`. Each returned mock function has all the
 * Jest methods available and you can add your custom implementations
 * as usual.
 * ```
 * scriptMock.mockImplementation(() => true)
 * ```
 * @param args string
 * @returns jest.Mock - Generic jest mock function
 *
 */
export default function (path: Paths<typeof chrome>) {
  const mockFn = jest.fn();
  const keys = path.split('.');

  function deepRecreate(): void {
    const methods = keys.reduceRight((obj, next, idx) => {
      if (idx === keys.length - 1) {
        return { [next]: mockFn };
      }
      return { [next]: obj };
    }, {});

    Object.assign(global.chrome, methods);
  }

  deepRecreate();
  return mockFn;
}
