module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['import', 'unused-imports'],
  extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended', 'plugin:import/typescript'],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: ['plugin:@typescript-eslint/recommended', 'plugin:import/typescript'],
      parserOptions: {
        project: ['./tsconfig.json'],
      },
      rules: {
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/ban-types': 'error',
        '@typescript-eslint/dot-notation': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'error',
        '@typescript-eslint/no-duplicate-imports': 'error',
        '@typescript-eslint/no-empty-interface': ['error', { allowSingleExtends: true }],
        '@typescript-eslint/no-explicit-any': 'error',
        '@typescript-eslint/no-implied-eval': 'error',
        '@typescript-eslint/no-misused-new': 'error',
        '@typescript-eslint/no-misused-promises': 'error',
        '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error',
        '@typescript-eslint/no-unnecessary-type-assertion': 'error',
        '@typescript-eslint/no-unused-vars': 'error',
        '@typescript-eslint/no-var-requires': 'error',
        '@typescript-eslint/prefer-function-type': 'error',
        '@typescript-eslint/prefer-includes': 'error',
        '@typescript-eslint/prefer-optional-chain': 'error',
        '@typescript-eslint/return-await': 'off',
        '@typescript-eslint/semi': ['error', 'always'],
        '@typescript-eslint/space-before-function-paren': 'off',
        '@typescript-eslint/strict-boolean-expressions': 'off',
        '@typescript-eslint/ban-ts-comment': 'error',
        '@typescript-eslint/comma-dangle': [
          'error',
          {
            arrays: 'always-multiline',
            objects: 'always-multiline',
            imports: 'always-multiline',
            exports: 'always-multiline',
            functions: 'always-multiline',
            enums: 'ignore',
            generics: 'ignore',
            tuples: 'ignore',
          },
        ],
        '@typescript-eslint/consistent-type-assertions': [
          'error',
          {
            assertionStyle: 'as',
            objectLiteralTypeAssertions: 'never',
          },
        ],
        '@typescript-eslint/explicit-function-return-type': [
          'error',
          {
            allowExpressions: true,
            allowHigherOrderFunctions: true,
            allowTypedFunctionExpressions: true,
            allowDirectConstAssertionInArrowFunctions: true,
          },
        ],
        '@typescript-eslint/method-signature-style': 'error',
        '@typescript-eslint/indent': [
          'error',
          2,
          // Disable rule for decorator-like constructions
          {
            ignoredNodes: [
              'PropertyDefinition[decorators]',
              'TSUnionType',
              'TSTypeParameterInstantiation',
              'TSIntersectionType',
              'FunctionExpression > .params[decorators.length > 0]',
              'FunctionExpression > .params > :matches(Decorator, :not(:first-child))',
              'ClassBody.body > PropertyDefinition[decorators.length > 0] > .key',
            ],
          },
        ],
        '@typescript-eslint/member-delimiter-style': [
          'error',
          {
            multiline: {
              delimiter: 'semi',
              requireLast: true,
            },
            singleline: {
              delimiter: 'semi',
              requireLast: false,
            },
            overrides: {
              interface: {
                multiline: {
                  delimiter: 'semi',
                  requireLast: true,
                },
              },
            },
          },
        ],
        '@typescript-eslint/naming-convention': [
          'error',
          {
            selector: ['default', 'variable', 'property', 'parameter', 'objectLiteralProperty', 'method'],
            format: ['camelCase', 'PascalCase'],
            leadingUnderscore: 'forbid',
            trailingUnderscore: 'forbid',
          },
          {
            selector: 'variable',
            modifiers: ['const'],
            format: ['UPPER_CASE', 'camelCase'],
          },
          {
            selector: 'variable',
            types: ['function'],
            format: ['camelCase', 'PascalCase'],
          },
          {
            selector: ['enum', 'class'],
            format: ['PascalCase'],
            leadingUnderscore: 'forbid',
            trailingUnderscore: 'forbid',
          },
          {
            selector: 'enumMember',
            format: ['UPPER_CASE'],
            leadingUnderscore: 'forbid',
            trailingUnderscore: 'forbid',
          },
          {
            selector: ['typeAlias', 'typeParameter'],
            prefix: ['T'],
            format: ['PascalCase'],
            leadingUnderscore: 'forbid',
            trailingUnderscore: 'forbid',
          },
          {
            selector: 'interface',
            prefix: ['I'],
            format: ['PascalCase'],
            leadingUnderscore: 'forbid',
            trailingUnderscore: 'forbid',
          },
          {
            selector: 'variable',
            modifiers: ['destructured'],
            format: null,
          },
          {
            selector: ['objectLiteralProperty'],
            format: null,
            modifiers: ['public'],
          },
          {
            selector: [
              'classProperty',
              'objectLiteralProperty',
              'typeProperty',
              'classMethod',
              'objectLiteralMethod',
              'typeMethod',
              'accessor',
              'enumMember',
            ],
            format: null,
            modifiers: ['requiresQuotes'],
          },
        ],
        'unused-imports/no-unused-imports-ts': 'error',
        'import/no-duplicates': 'error',
        'import/no-unresolved': 'error',
        'import/order': [
          'error',
          {
            pathGroups: [
              {
                pattern: '~/**',
                group: 'external',
                position: 'after',
              },
            ],
            groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
            'newlines-between': 'always',
            alphabetize: {
              order: 'asc',
              caseInsensitive: true,
            },
          },
        ],
      },
    },
    {
      files: ['*.js', '*.ts'],
      rules: {
        'arrow-body-style': 'off',
        'eol-last': 'error',
        'newline-after-var': 'error',
        'newline-before-return': 'error',
        'no-console': ['error', { allow: ['warn', 'error'] }],
        'no-duplicate-imports': 'off',
        'no-fallthrough': 'error',
        'no-return-await': 'error',
        'no-undef': 'off',
        'no-void': ['error', { allowAsStatement: true }],
        'object-curly-newline': 'off',
        'semi-spacing': ['error', { before: false, after: true }],
        'no-multi-spaces': 'error',
        'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1 }],
      },
    },
    {
      files: ['*.test.*', '*.spec.*', '*.js'],
      rules: {
        'import/no-unused-modules': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/consistent-type-assertions': 'off',
      },
    },
  ],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/external-module-folders': ['node_modules'],
    'import/resolver': {
      typescript: {
        project: './tsconfig.json',
      },
    },
  },
};
