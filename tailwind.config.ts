import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        midnight: '#450A18',
        crimson: '#7B182F',
        ruby: '#C43556',
        blush: '#F9CCCB',
        cyan: '#86DDE4',
        teal: '#197074',
        navy: '#082D36',
      },
    },
  },
  plugins: [],
};

export default config;
