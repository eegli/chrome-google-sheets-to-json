/* Utility function to mock currently unavailable methods in
'jest-chrome */

/**
 * Takes an arbitrary amount of  strings as the path to mocked chrome
 * method. Example:
 * ```
 * const scriptMock = mockForV3('scripts', 'execute')
 * ```
 * This will produce
 * ```
 * global.chrome.scripts.execute = jest.fn()
 * ```
 * The function returns a mock instance with all the Jest methods
 * available. You can add your custom implementation as usual.
 * ```
 * scriptMock.mockImplementation(() => true)
 * ```
 * @param args (string, string, string, ...)
 * @returns jest.Mock - Generic jest mock function
 *
 */

export default function mockFor<
  T extends keyof typeof chrome,
  K extends keyof typeof chrome[T]
>(m1: T, m2: K): jest.Mock {
  const mockFn = jest.fn();

  function deepRecreate(): void {
    const methods = [m1, m2].reduceRight((obj, next, idx) => {
      if (idx === 1) {
        return { [next]: mockFn };
      }
      return { [next]: obj };
    }, {});
    global.chrome = { ...global.chrome, ...methods };
  }
  deepRecreate();
  return mockFn;
}

/* export default function (...args: string[]): jest.Mock {
  const mockFn = jest.fn();

  function deepRecreate(): void {
    const last = args.length - 1;
    const methods = args.reduceRight((obj, next, idx) => {
      if (idx === last) {
        return { [next]: mockFn };
      }
      return { [next]: obj };
    }, {});
    Object.assign(global.chrome, methods);
  }
  deepRecreate();
  return mockFn;
} */
