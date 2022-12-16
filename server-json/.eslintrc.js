module.exports = {
  root: true,
  env: {
    node: true,
    es2021: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    project: "tsconfig.json",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint/eslint-plugin", "import"],
  extends: ["plugin:@typescript-eslint/recommended", "plugin:prettier/recommended"],
  rules: {
    // Check import order for types to be imported separately
    "@typescript-eslint/consistent-type-imports": "warn",
    // Let me shoot myself in the foot if I want!
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-unused-vars": "warn",
    // Prevent (and combine) duplicate import declarations
    "import/no-duplicates": "warn",
    // Sort imports into alphabetical groups
    "import/order": [
      "warn",
      {
        // Custom group definitions (uses 'minimatch')
        pathGroups: [
          // Example: TS aliases are automatically categorized as 'internal' paths by plugin!
          // { pattern: "@{app,common,modules,typings}/**", group: "external", position: "after" }
        ],
        // Order import groups (can group multiple together)
        groups: [
          "builtin", // Built-in Node packages
          "external", // NPM depencencies
          "internal", // Internal aliases/paths (from TS config)
          ["parent", "sibling", "index"], // Relative paths
          "unknown", // All uncategorized imports
          "type", // Specific type imports (ie 'import type {} ...')
        ],
        "newlines-between": "always",
        alphabetize: {
          order: "asc",
          caseInsensitive: false,
        },
      },
    ],
    // Prevent throwing non-Error literals (no stacktrace, etc)
    "no-throw-literal": "error",
    "prefer-const": "warn",
    // Prettier formatting suggestions will be applied automatically
    "prettier/prettier": "warn",
    // Sort multiple import keys (sorting import declarations is handled by 'import/order')
    "sort-imports": [
      "warn",
      {
        // Ignore case to avoid placing PascalCase imports before camelCase (ie. 'import {Example, awesomeExample} ...')!
        ignoreCase: true,
        // Ignore sorting import declaration (handled by 'import/order')
        ignoreDeclarationSort: true,
      },
    ],
  },
  settings: {
    "import/extensions": [".js", ".ts"],
    "import/resolver": {
      typescript: {
        // Allow 'import' rules to reference TS config (for aliases, etc)
        project: "./tsconfig.json",
      },
    },
  },
};
