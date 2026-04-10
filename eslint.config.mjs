import nextVitals from 'eslint-config-next/core-web-vitals'
import prettier from 'eslint-config-prettier'
import tailwindcss from 'eslint-plugin-tailwindcss'

export default [
  ...nextVitals,
  ...tailwindcss.configs['flat/recommended'],
  prettier,
  {
    settings: {
      next: {
        rootDir: ['./'],
      },
      tailwindcss: {
        callees: ['cn'],
        config: 'tailwind.config.js',
      },
    },
    rules: {
      '@next/next/no-html-link-for-pages': 'off',
      'react/jsx-key': 'off',
      'tailwindcss/no-custom-classname': 'off',
      'tailwindcss/enforces-shorthand': 'off',
      'react/no-unescaped-entities': 'off',
      'import/no-anonymous-default-export': 'off',
      'react-hooks/immutability': 'off',
      'react-hooks/preserve-manual-memoization': 'off',
      'react-hooks/purity': 'off',
      'react-hooks/refs': 'off',
      'react-hooks/set-state-in-effect': 'off',
      'tailwindcss/classnames-order': 'off',
      'tailwindcss/migration-from-tailwind-2': 'off',
      'tailwindcss/no-unnecessary-arbitrary-value': 'off',
    },
  },
  {
    ignores: ['dist/*', '.cache', 'public', 'node_modules', '*.esm.js'],
  },
]
