type MockedFunction<T extends (...args: any) => any> =
  ReturnType<T> extends void
    ? jest.Mock
    : jest.Mock<ReturnType<T>, Parameters<T>>;

export type Mocked<T> = {
  [K in keyof T]: T[K] extends (...args: any) => any
    ? MockedFunction<T[K]>
    : jest.Mock<T[K]>;
} & T;
