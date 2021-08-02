/* Utility function to mock currently unavailable methods in
'jest-chrome */

/**
 * Takes an arbitrary amount of  strings as the path to mocked chrome
 * method. Example:
 *
 * ```
 * const scriptMock = mockForV3('scripts', 'execute')
 * ```
 *
 * This will produce
 * ```
 * global.chrome.scripts.execute = jest.fn()
 * ```
 *
 * The function returns a mock instance with all the Jest methods
 * available. You can add your custom implementation as usual.
 * ```
 * scriptMock.mockImplementation(() => true)
 * ```
 * @param args (string, string, string, ...)
 * @returns jest.Mock - Generic jest mock function
 *
 */

export function mockForV3(...args: string[]) {
  const mockFn = jest.fn();

  function deepRecreate() {
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
}
