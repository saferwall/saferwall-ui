<script lang="ts">
	import { timestampToFormattedDate } from '$lib/utils/date';
	import { timeSince } from '$lib/utils/format';

	export let date: number;

	$: formattedDate = date && timeSince(date * 1000);
	$: base = timestampToFormattedDate(date * 1000);

	let cclass: string = '';
	export { cclass as class };
</script>

{#if date}
	<time class="flex-grow group relative flex {cclass}" datetime={base}>
		<span class="group-hover:opacity-0">{formattedDate}</span>
		<span class="opacity-0 group-hover:opacity-100 inset-0 absolute">{base}</span>
	</time>
{/if}

<style class="scss">
	span {
		@apply transition-all duration-200 delay-200;
	}
</style>
