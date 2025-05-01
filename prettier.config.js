/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
  plugins: ['prettier-plugin-tailwindcss'],
  singleQuote: true,
  trailingComma: 'es5',
  tabWidth: 2,
  semi: true,
  printWidth: 80,
};

export default config;
