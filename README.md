# unstoppable-mockery

[![Atlassian license](https://img.shields.io/badge/license-Apache%202.0-blue.svg?style=flat-square)](LICENSE) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](CONTRIBUTING.md)

Unstoppable Mockery is a lightweight utility for creating type-safe, fully mocked classes and interfaces for Jest tests. Unlike `jest.mock('<module-path>')`, it allows you to mock classes and interfaces directly, with full TypeScript support and without relying on module boundaries. This makes your tests more maintainable, readable, and less brittle to refactoring.

## Usage

### Mocking Classes

```typescript
import { mockClass } from 'unstoppable-mockery';

class MyService {
  doSomething() { /* ... */ }
  getValue() { return 42; }
}

const mock = mockClass(MyService, { getValue: () => 100 });

// All prototype methods are jest.fn()
expect(jest.isMockFunction(mock.doSomething)).toBe(true);

// Overridden property
expect(mock.getValue()).toBe(100);
```

### Mocking Interfaces

```typescript
import { mockInterface } from 'unstoppable-mockery';

interface ApiClient {
  fetchData: (id: string) => Promise<any>;
  isConnected: boolean;
}

const mockApi = mockInterface<ApiClient>({ isConnected: true });

// Dynamically created jest.fn() for interface methods
mockApi.fetchData.mockResolvedValue({ data: 'test' });

// Override property is used
expect(mockApi.isConnected).toBe(true);

// Any property access creates a mock function
expect(jest.isMockFunction(mockApi.fetchData)).toBe(true);
```

### Why use unstoppable-mockery instead of jest.mock?

- **Type Safety:** Directly mock classes and interfaces with full TypeScript support.
- **No Module Boundaries:** Mock any class/interface, even if not exported from a module.
- **Refactor-Friendly:** Your tests won't break if you move or rename files/classes.
- **Fine-Grained Control:** Override specific methods/properties easily.
- **Cleaner Tests:** No need for manual mock implementations or resetting modules.

## Installation

```sh
npm install unstoppable-mockery --save-dev
```

## Documentation

See the source code and TSDoc comments for API details. For advanced usage, refer to the examples in the repository.

## Tests

To run tests:

```sh
npm test
```

## Contributions

Contributions to unstoppable-mockery are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details.

## License

Copyright (c) 2025 Atlassian US., Inc.
Apache 2.0 licensed, see [LICENSE](LICENSE) file.

[![With ❤️ from Atlassian](https://raw.githubusercontent.com/atlassian-internal/oss-assets/master/banner-cheers.png)](https://www.atlassian.com)
