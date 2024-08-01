<script lang="ts">
	import { fileTypeColors } from '$lib/utils';

	export let name: string;

	$: color = fileTypeColors[name as keyof typeof fileTypeColors] || '#0001212';
</script>

<div class="relative inline-flex" style={'color: ' + color}>
	<div
		class="w-16 h-16 *:!fill-background rounded-full border-2 border-current flex flex-col items-center justify-center"
	>
		<svg class="w-8 h-8 [&_>_use]:fill-inherit">
			<use href="/images/file-icons.svg#{name}" />
		</svg>
	</div>
	<div
		class="absolute -bottom-2 left-1/2 -translate-x-1/2 inline-block font-semibold px-2 rounded-xl text-xs uppercase bg-background border-2 border-current"
	>
		{name}
	</div>
</div>
