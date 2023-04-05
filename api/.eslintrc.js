module.exports ={
  "root": true,
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:jest/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:testing-library/recommended",
    "react-app",
    "plugin:prettier/recommended",
    "plugin:jsx-a11y/recommended"
  ],
  "plugins": ["react", "jest", "import", "testing-library", "jsx-a11y"],
  "env": {
    "browser": true,
    "es6": true,
    "jest": true
  },
  "settings": {
    "react": {
      "pragma": "React",
      "version": "detect"
    }
  },
  "overrides": [
    {
      "files": ["**/*.ts", "**/*.tsx"],
      "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
      },
      "parser": "@typescript-eslint/parser",
      "parserOptions": {
        "project": "./tsconfig.json",
        "ecmaFeatures": {
          "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
      },
      "plugins": [
        "@typescript-eslint",
        "simple-import-sort",
        "jest",
        "jsx-a11y"
      ],
      "extends": [
        "prettier",
        "prettier/react",
        "react-app",
        "eslint:recommended",
        "plugin:react/recommended",
        "prettier/@typescript-eslint",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:testing-library/recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:jsx-a11y/recommended"
      ],
      "rules": {
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/explicit-member-accessibility": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-unused-vars": "off",
        "@typescript-eslint/no-submodule-imports": "off",
        "@typescript-eslint/no-unused-expressions": "warn",
        "@typescript-eslint/jsx-no-lambda": "off",
        "@typescript-eslint/prefer-interface": "off",
        "@typescript-eslint/interface-name-prefix": "off",
        "@typescript-eslint/camelcase": "off",
        "@typescript-eslint/no-empty-function": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "react/display-name": "off",
        "react/prop-types": "off",
        "simple-import-sort/imports": "warn",
        "no-console": "off",
        "sort-keys": "off",
        "sort-imports": "off",
        "no-restricted-imports": [
          "error",
          {
            "patterns": [
              "@material-ui/*/*/*",
              "!@material-ui/core/test-utils/*"
            ]
          }
        ]
      },
      "env": {
        "browser": true,
        "es6": true
      }
    }
  ]
}

