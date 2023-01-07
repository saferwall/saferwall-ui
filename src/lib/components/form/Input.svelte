<script lang="ts">
	let cclass: string = '';
	export let type: string = 'text';
	export let name: string = '';
	export let label: string = '';
	export let placeholder: string = ' ';
	const isPassword = type === 'password';

	export { cclass as class };

	const togglePassword = () => {
		type = type === 'password' ? 'text' : 'password';
	};
</script>

<label class="input peer-focus" class:labeled={label}>
	{#if label}
		<span class="input__label">{label}</span>
	{/if}
	<input {type} {name} {placeholder} class="input__field {cclass}" />
	{#if isPassword}
		<svg class="ui_icon w-6 h-6" on:mouseup={togglePassword}
			><use href="/images/icons.svg#icon-eye" /></svg
		>
	{/if}
</label>

<style lang="scss">
	.input {
		@apply flex w-full relative;

		&__field {
			@apply w-full;
			@apply px-4 pt-3 pb-3.5;
			@apply border rounded;
		}

		&.labeled {
			.input__field {
				@apply px-4 pt-6 pb-2;
			}
		}

		&__label {
			@apply font-light;
			@apply absolute transition-all;
			@apply text-grayx-500 left-4 top-1/2 -translate-y-1/2 text-base;
		}

		&:has(input:not(:placeholder-shown)),
		&:has(:focus) {
			.input__label {
				@apply top-4 text-sm;
			}
		}

		.ui_icon {
			@apply text-grayx-400 hover:cursor-pointer hover:text-grayx-900;
			@apply absolute right-3 -translate-y-1/2 top-1/2;
		}
	}
</style>
