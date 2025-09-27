/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	darkMode: "class",
	theme: {
		extend: {
			colors: {
				// Custom theme colors that use CSS variables
				"theme-primary": {
					50: "rgb(var(--theme-primary-50))",
					100: "rgb(var(--theme-primary-100))",
					200: "rgb(var(--theme-primary-200))",
					300: "rgb(var(--theme-primary-300))",
					400: "rgb(var(--theme-primary-400))",
					500: "rgb(var(--theme-primary-500))",
					600: "rgb(var(--theme-primary-600))",
					700: "rgb(var(--theme-primary-700))",
					800: "rgb(var(--theme-primary-800))",
					900: "rgb(var(--theme-primary-900))",
					950: "rgb(var(--theme-primary-950))",
					DEFAULT: "rgb(var(--theme-primary-500))",
				},
				"theme-secondary": {
					50: "rgb(var(--theme-secondary-50))",
					100: "rgb(var(--theme-secondary-100))",
					200: "rgb(var(--theme-secondary-200))",
					300: "rgb(var(--theme-secondary-300))",
					400: "rgb(var(--theme-secondary-400))",
					500: "rgb(var(--theme-secondary-500))",
					600: "rgb(var(--theme-secondary-600))",
					700: "rgb(var(--theme-secondary-700))",
					800: "rgb(var(--theme-secondary-800))",
					900: "rgb(var(--theme-secondary-900))",
					950: "rgb(var(--theme-secondary-950))",
					DEFAULT: "rgb(var(--theme-secondary-500))",
				},
			},
		},
	},
	plugins: [],
};
