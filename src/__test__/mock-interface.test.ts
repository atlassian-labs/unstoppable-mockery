import { mockInterface } from '../mock-interface';

describe('mockInterface', () => {
  it('mocks an interface with synchronous functions', () => {
    interface Test {
      fn: () => number;
    }
    const mock = mockInterface<Test>();

    mock.fn.mockReturnValue(5);

    expect(mock.fn).toEqual(expect.any(Function));
    expect(mock.fn()).toEqual(5);
  });

  it('mocks an interface with asynchronous functions', async () => {
    interface TestWithPromise {
      fn: () => Promise<number>;
    }

    const mock = mockInterface<TestWithPromise>();

    mock.fn.mockResolvedValue(3);

    expect(mock.fn).toEqual(expect.any(Function));
    await expect(mock.fn()).resolves.toEqual(3);
  });

  it('allows nested interface mocks', async () => {
    interface Nested {
      nestedFn: () => Promise<number>;
    }

    interface TestNested {
      fn: () => Promise<Nested>;
    }

    const nestedMock = mockInterface<Nested>();
    const mock = mockInterface<TestNested>();

    mock.fn.mockResolvedValue(nestedMock);
    nestedMock.nestedFn.mockResolvedValue(53);

    const { nestedFn } = await mock.fn();
    await expect(nestedFn()).resolves.toEqual(53);
  });

  it('sets properties on a mocked interface with some casting', () => {
    interface TestWithProp {
      fn: () => number;
      prop: number;
    }
    const mock = mockInterface<TestWithProp>();

    (mock as TestWithProp).prop = 1;
    expect(mock.prop).toBe(1);
  });

  it('tracks calls made to mocks', () => {
    interface Test {
      fn: () => number;
    }
    const mock = mockInterface<Test>();

    mock.fn();
    mock.fn();

    expect(mock.fn).toHaveBeenCalledTimes(2);
  });

  it('allows overrides for properties', () => {
    interface Test {
      prop: string;
    }
    const mock = mockInterface<Test>({ prop: 'test' });

    expect(mock.prop).toBe('test');
  });

  it('allows overrides for functions', () => {
    interface Test {
      fn: () => number;
    }
    const mock = mockInterface<Test>({ fn: () => 5 });

    expect(mock.fn()).toBe(5);
  });
});
