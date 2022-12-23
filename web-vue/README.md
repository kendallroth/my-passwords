# Web (Vue)

## Setup

1. Ensure environment variables are populated with valid values
2. Install dependencies with `npm install`
3. Start Vite with `npm run dev`
4. Access web frontend at `localhost:600X`

## Testing

Tests are executed using [vitest](https://vitest.dev/guide/) and [vue-test-utils](https://test-utils.vuejs.org/guide/).

```bash
npm run test

npm run test:watch

# Generate coverage report
npm run test:coverage

# Run a specific test suite name (via filter)
npm run test -- <test_suite_name>
```

### Caveats

- Avoid using `concurrent` tests on component test suites containing snapshot tests! For some reason these snapshot tests do not work when run in parallel!
- Some Vue wrapper operations require awaiting to ensure Vue can re-render before making assertions (similar to waiting for `nextTick`).

## Caveats

### Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
    1) Run `Extensions: Show Built-in Extensions` from VSCode's command palette
    2) Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.
