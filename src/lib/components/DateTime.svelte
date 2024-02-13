<script lang="ts">
	import { timeSince, timestampToFormattedDate } from '$lib/utils';

	export let date: number;

	$: formattedDate = date && timeSince(date);
	$: base = timestampToFormattedDate(date);
</script>

{#if date}
	<time class="flex-grow group relative flex {$$props.class}" datetime={base}>
		<span class="group-hover:opacity-0">{formattedDate}</span>
		<span class="opacity-0 group-hover:opacity-100 inset-0 absolute">{base}</span>
	</time>
{/if}

<style class="scss">
	span {
		@apply transition-all duration-200 delay-200;
	}
</style>
