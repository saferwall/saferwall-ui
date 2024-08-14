<script lang="ts">
	import Icon from './Icon.svelte';

	export let valid: boolean;
	export let signed: boolean;

	$: label =
		valid && signed ? 'Signed & Valid' : !valid && signed ? 'Signed but invalid' : 'Not Signed';
	$: icon =
		valid && signed
			? 'cerificate-valid'
			: !valid && signed
			? 'cerificate-signed'
			: 'cerificate-invalid';
</script>

<div class="validity" class:signed class:valid>
	<span><Icon name={icon} size="w-5 h-5" /></span>
	<span>{label}</span>
</div>

<style lang="postcss">
	.validity {
		@apply flex items-center space-x-2;
		@apply font-semibold px-4 py-2.5 rounded w-fit;
		@apply bg-red-100 text-red-500;
		@apply dark:bg-red-950 dark:text-red-400;

		&.signed {
			@apply bg-orange-100 text-orange-500;
			@apply dark:bg-orange-950 dark:text-orange-400;
		}
		&.signed.valid {
			@apply bg-green-100 text-green-600;
			@apply dark:bg-green-950 dark:text-green-300;
		}
	}
</style>
