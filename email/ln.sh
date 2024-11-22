rm -rf \
	tailwind.config.ts \
	src/vars.css \
	src/logo.svg \
	;
ln -s ../tailwind.config.ts tailwind.config.ts;
ln -s ../../src/lib/styles/vars.css src/vars.css;
ln -s ../../src/lib/components/partials/SvgLogo.svelte src/logo.svg;