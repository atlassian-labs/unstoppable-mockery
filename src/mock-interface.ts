import type { PartialDeep } from 'type-fest';

import type { Mocked } from './types';

/**
 * Inspired by ts-sinon's `stubInterface` method
 * https://github.com/ttarnowski/ts-sinon/
 *
 * This function dynamically creates & assigns jest functions to the mock object as they are accessed.
 * You can technically access any property on the mock and it will be created as a mock function.
 *
 * You can define overrides for certain properties that will be used instead of dynamically created mocks.
 *
 * ```ts
 *   interface Interface {
 *     doSomething: () => string;
 *     property: string;
 *   }
 *
 *   // Create a mocked object based on interface
 *   const mock = mockInterface<Interface>();
 *   // Modify the mock for testing
 *   mock.doSomething.mockReturnValue("hello");
 *   (mock as Interface).property = 'test';
 * ```
 * @returns A mocked object based on an interface or class type
 */
export function mockInterface<T extends object>(
  overrides?: PartialDeep<T>,
): Mocked<T> {
  return new Proxy({} as Mocked<T>, {
    get: (target, name) => {
      if (overrides && name in overrides) {
        return overrides[name as keyof PartialDeep<T>];
      }

      if (
        !Object.prototype.hasOwnProperty.call(target, name) &&
        name !== 'then'
      ) {
        (target as any)[name] = jest.fn();
      }

      return (target as any)[name];
    },
  });
}
