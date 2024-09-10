import { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

export default {
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}'],
	important: true,
	theme: {
		extend: {
			fontFamily: {
				primary: 'Inter'
			},
			fontWeight: {
				regular: "400",
				medium: "500",
				semibold: "600"
			},
			fontSize: {
				"xs": "13px",
				"sm": "14px",
				"base": "15px",
				"md": "16px",
				"lg": "18px",
				"xl": "23px",
				"2xl": "25px",
				"3xl": "28px"
			},
			borderRadius: {
				DEFAULT: "10px",

				sm: "6px",
				base: "10px",
				lg: "20px",

				md: "0.5rem",
				card: "25px"
			},
			colors: {
				background: 'var(--background)',
				neutral: {
					100: 'var(--neutral-100)',
					500: 'var(--neutral-500)',
					600: 'var(--neutral-600)',
					700: 'var(--neutral-700)',
					800: 'var(--neutral-800)',
					900: 'var(--neutral-900)',
				},
				gray: {
					100: 'var(--gray-100)',
					200: 'var(--gray-200)',
					300: 'var(--gray-300)',
					400: 'var(--gray-400)',
					500: 'var(--gray-500)',
					600: 'var(--gray-600)', /* deprecated, only left to not break usages of the color */
					700: 'var(--gray-700)', /* deprecated, only left to not break usages of the color */
					800: 'var(--gray-800)',
					900: 'var(--gray-900)',
					950: 'var(--gray-950)',
					960: 'var(--gray-960)',
				},
				brand: {
					DEFAULT: 'var(--brand-500)',
					300: 'var(--brand-300)',
					400: 'var(--brand-400)',
					500: 'var(--brand-500)',
					"CF-surface": "var(--surface-brand-CF)",
					"CF-light-surface": "var(--surface-brand-CF-light)",
					"CF-lighter-surface": "var(--surface-brand-CF-lighter)",
					"surface": "var(--surface-brand)",
					"text": "var(--text-brand)",
					"light-text": "var(--text-brand-light)",
				},
				line: {
					"surface": "var(--surface-line)",
				},
				menu: {
					"lvl2-surface": "var(--surface-menu-lvl2)",
					"surface": "var(--surface-menu)",
				},
				"sub-menu": {
					"surface": "var(--surface-sub-menu)"
				},
				"table-res": {
					"text": "var(--text-table-res)"
				},
				primary: {
					DEFAULT: '#5F4CD9',
					"border": "var(--border-primary)",
					"surface": "var(--surface-primary)",
					"text": "var(--text-primary)",
					50: '#eff2fe',
					100: '#e2e6fd',
					200: '#cbd0fa',
					300: '#abb2f6',
					400: '#898bf0',
					500: '#756de7',
					600: '#5f4cd9',
					700: '#5642c0',
					800: '#46389b',
					900: '#3c347b',
					950: '#241e48',
				},
				secondary: {
					"border": "var(--border-secondary)",
					"surface": "var(--surface-secondary)",
					"text": "var(--text-secondary)",
				},
				tertiary: {
					"surface": "var(--surface-tertiary)",
					"text": "var(--text-tertiary)",
				},
				searchbar: {
					"text": "var(--text-searchbar)",
				},
				alert: {
					green: "var(--alert-green)",
					red: "var(--alert-red)",
					orange: "var(--alert-orange)",
				},
				hash: {
					surface: "var(--surface-hash)",
				},
				red: {
					DEFAULT: '#E63755'
				},
				green: {
					DEFAULT: '#56AC30'
				},
				orange: {
					DEFAULT: '#F08039'
				},
				// FIXME: to remove 
				bluex: {
					DEFAULT: '#2573F0'
				},
			},
			// FIXME: to remove 
			boxShadow: {
				base: '0px 2px 9px rgb(0 0 0 / 0.05)'
			},
			backdropBlur: {
				xs: '1px'
			},
			gridTemplateColumns: {
				16: 'repeat(16, minmax(0, 1fr))'
			},
		}
	},
	plugins: [
		require('@tailwindcss/typography'),
		plugin(function ({ addUtilities }) {
			addUtilities({
				".sw-border-primary": { borderColor: "var(--border-primary)" },
				".sw-border-secondary": { borderColor: "var(--border-secondary)" },
				".sw-surface-brand-CF": { borderColor: "var(--surface-brand-CF)" },
				".sw-surface-brand": { backgroundColor: "var(--surface-brand)" },
				".sw-surface-line": { backgroundColor: "var(--surface-line)" },
				".sw-surface-menu-lvl2": { backgroundColor: "var(--surface-menu-lvl2)" },
				".sw-surface-menu": { backgroundColor: "var(--surface-menu)" },
				".sw-surface-primary": { backgroundColor: "var(--surface-primary)" },
				".sw-surface-secondary": { backgroundColor: "var(--surface-secondary)" },
				".sw-surface-sub-menu": { backgroundColor: "var(--surface-sub-menu)" },
				".sw-surface-tertiary": { backgroundColor: "var(--surface-tertiary)" },
				".sw-surface-alert-green": { backgroundColor: "var(--alert-green)" },
				".sw-surface-alert-orange": { backgroundColor: "var(--alert-orange)" },
				".sw-surface-alert-red": { backgroundColor: "var(--alert-red)" },
				".sw-text-brand": { color: "var(--text-brand)" },
				".sw-text-primary": { color: "var(--text-primary)" },
				".sw-text-searchbar": { color: "var(--text-searchbar)" },
				".sw-text-secondary": { color: "var(--text-secondary)" },
				".sw-text-tertiary": { color: "var(--text-tertiary)" },
				".sw-text-table-res": { color: "var(--text-table-res)" },
				".sw-text-alert-green": { color: "var(--alert-green)" },
				".sw-text-alert-orange": { color: "var(--alert-orange)" },
				".sw-text-alert-red": { color: "var(--alert-red)" },
			})
		})
	]
} satisfies Config;
