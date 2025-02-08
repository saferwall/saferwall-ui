import { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

let oldColorsConfig: Config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
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
					970: 'var(--gray-970)',
					980: 'var(--gray-980)',
					981: 'var(--gray-981)',
					982: 'var(--gray-982)',
					983: 'var(--gray-983)',
					984: 'var(--gray-984)',
					985: 'var(--gray-985)',
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
					"border": "var(--border-brand)",
					"light-text": "var(--text-brand-light)",
				},
				line: {
					"surface": "var(--surface-line)",
				},
				"line-sec": {
					"surface": "var(--surface-line-sec)",
				},
				crcl: {
					"surface": "var(--surface-crcl)",
				},
				"p-tree": {
					"surface": "var(--surface-p-tree)",
				},
				apc: {
					"surface": "var(--surface-apc)",
				},
				fltr: {
					"surface": "var(--surface-fltr)"
				},
				selected: {
					"surface": "var(--surface-selected)"
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
					"icn": "var(--icn-primary)",
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
					"icn": "var(--icn-secondary)",
				},
				tertiary: {
					"surface": "var(--surface-tertiary)",
					"text": "var(--text-tertiary)",
					"border": "var(--border-tertiary)",
				},
				elm: {
					"border": "var(--border-elm)",
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
			},
		}
	}
}

export default {
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}'],
	important: true,
	corePlugins:{
		preflight: true,
	},
	presets: [oldColorsConfig],
	theme: {
		extend: {
			padding: {
				landing: "var(--px-landing)",
			},
			margin: {
				landing: "var(--mx-landing)",
			},
			fontFamily: {
				"jetbrains-mono": `"JetBrains Mono"`,
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
				brand: {
					100: "var(--brand-100)",
					200: "var(--brand-200)",
					300: "var(--brand-300)",
					400: "var(--brand-400)",
					surface: "var(--surface-brand)",
					text: "var(--text-brand)"
				},
				full: {
					100: "var(--full-100)",
					200: "var(--full-200)",
					300: "var(--full-300)"
				},
				gray: {
					100: "var(--gray-100)",
					200: "var(--gray-200)",
					300: "var(--gray-300)",
					400: "var(--gray-400)",
					500: "var(--gray-500)",
					800: "var(--gray-800)",
					900: "var(--gray-900)",
					950: "var(--gray-950)",
					960: "var(--gray-960)",
					970: "var(--gray-970)",
					980: "var(--gray-980)",
					981: "var(--gray-981)",
					982: "var(--gray-982)",
					983: "var(--gray-983)",
					984: "var(--gray-984)",
					985: "var(--gray-985)",
					990: "var(--gray-990)",
					991: "var(--gray-991)",
					992: "var(--gray-992)",
					993: "var(--gray-993)"
				},
				neutral: {
					100: "var(--neutral-100)",
					500: "var(--neutral-500)",
					600: "var(--neutral-600)",
					700: "var(--neutral-700)",
					800: "var(--neutral-800)",
					900: "var(--neutral-900)",
					910: "var(--neutral-910)",
					920: "var(--neutral-920)",
					930: "var(--neutral-930)"
				},
				alert: {
					green: "var(--alert-green)",
					orange: "var(--alert-orange)",
					red: "var(--alert-red)",
					text: "var(--text-alert)"
				},
				border: {
					alert: "var(--border-alert)",
					brand: "var(--border-brand)",
					elm: "var(--border-elm)",
					primary: "var(--border-primary)",
					secondary: "var(--border-secondary)",
					tertiary: "var(--border-tertiary)"
				},
				primary: {
					icn: "var(--icn-primary)",
					surface: "var(--surface-primary)",
					text: "var(--text-primary)"
				},
				quaternary: {
					icn: "var(--icn-quaternary)",
					surface: "var(--surface-quaternary)",
					text: "var(--text-quaternary)"
				},
				secondary: {
					icn: "var(--icn-secondary)",
					surface: "var(--surface-secondary)",
					text: "var(--text-secondary)"
				},
				tertiary: {
					icn: "var(--icn-tertiary)",
					surface: "var(--surface-tertiary)",
					text: "var(--text-tertiary)"
				},
				"advanced-search": {
					surface: "var(--surface-advanced-search)"
				},
				apc: {
					surface: "var(--surface-apc)"
				},
				bms: {
					surface: "var(--surface-bms)"
				},
				"brand-CF": {
					surface: "var(--surface-brand-CF)"
				},
				crcl: {
					surface: "var(--surface-crcl)"
				},
				fltr: {
					surface: "var(--surface-fltr)"
				},
				hash: {
					surface: "var(--surface-hash)"
				},
				line: {
					surface: "var(--surface-line)"
				},
				"line-sec": {
					surface: "var(--surface-line-sec)"
				},
				menu: {
					surface: "var(--surface-menu)"
				},
				"menu-lvl2": {
					surface: "var(--surface-menu-lvl2)"
				},
				"p-tree": {
					surface: "var(--surface-p-tree)"
				},
				"quaternary-hov": {
					surface: "var(--surface-quaternary-hov)"
				},
				"quaternary-hov2": {
					surface: "var(--surface-quaternary-hov2)"
				},
				"quaternary-sys": {
					surface: "var(--surface-quaternary-sys)"
				},
				selected: {
					surface: "var(--surface-selected)"
				},
				"sub-menu": {
					surface: "var(--surface-sub-menu)"
				},
				"tbl-advanced-search": {
					surface: "var(--surface-tbl-advanced-search)"
				},
				neut: {
					text: "var(--text-neut)"
				},
				searchbar: {
					text: "var(--text-searchbar)"
				},
				"table-res": {
					text: "var(--text-table-res)"
				}
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
		// @ts-ignore
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
