import type { Mocked } from './types';

/**
 * Creates a mocked version of a class, replacing all prototype methods with jest mock functions.
 *
 * @template T - The type of the class to mock.
 * @param template - The class constructor to mock.
 * @param properties - Optional properties to override or add to the mock.
 * @returns A mocked object with all prototype methods replaced by jest.fn(), and any provided properties.
 *
 * @example
 * ```typescript
 * class MyService {
 *   doSomething() { }
 *   getValue() { return 42; }
 * }
 *
 * const mock = mockClass(MyService, { getValue: () => 100 });
 *
 * // All prototype methods are jest.fn()
 * expect(jest.isMockFunction(mock.doSomething)).toBe(true);
 *
 * // Overridden property
 * expect(mock.getValue()).toBe(100);
 * ```
 */
export function mockClass<T>(
  template: new (...args: any[]) => T,
  properties: Partial<T> = {},
): Mocked<T> {
  const mockedObject = Object.getOwnPropertyNames(template.prototype).reduce(
    (prev, current) => {
      (prev as any)[current] = jest.fn();
      return prev;
    },
    {} as Mocked<T>,
  );

  return {
    ...mockedObject,
    ...properties,
  };
}
