export default {
	plugins: {
		"tailwindcss/nesting": {},
		tailwindcss: {},
		autoprefixer: {},
		"@csstools/postcss-light-dark-function": {},
		"@fullhuman/postcss-purgecss": {
			content: ["./**/*.html"],
			css: [ "./**/*.html"],
			extractCSS: false,
			variables: true,
		}
	}
};
