<script lang="ts">
	import Navbar from './_Navbar.svelte';
	import CallToAction from './_CallToAction.svelte';
	import Footer from './_Footer.svelte';
	import { cssClamp } from '$lib/utils';
</script>

{@html `<${""}style>html, body { background-color: #0D0D0D; scroll-behavior: smooth; }</style>`}

<main class="  flex flex-col items-stretch 
		landing-main relative
		text-[#E8E8E8] min-h-[100vh]
					 [--px-landing:16px]
		 min-[425px]:[--px-landing:40px]
		 		  lg:[--px-landing:80px]
					 [--mx-landing:16px]
		 min-[425px]:[--mx-landing:40px]
		 		  lg:[--mx-landing:80px]
	"
	>
	<Navbar />
	<div class="grow w-full relative z-10 *:[&_not(.container)]:max-w-full --*:mx-auto">
		<slot></slot>
	</div>
	<CallToAction />
	<Footer />
</main>

<style lang="postcss">
	.landing-main {
		:global(.landing-container) {
			@media (min-width: 1152px) {
				max-width: 1152px !important;
			}
		}
		:global(.container) {
			padding-inline: 0;
		}
	}
</style>