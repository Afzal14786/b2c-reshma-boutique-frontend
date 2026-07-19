/** @type {import('tailwindcss').Config} */
import preset from '../../tooling/tailwind/index.mjs';

export default {
  presets: [preset],
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx}',
  ],
};