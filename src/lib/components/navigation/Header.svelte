<script lang="ts">
	import type { Saferwall } from '$lib/types';

	import Button from '../form/Button.svelte';
	import InputSearch from '../form/InputSearch.svelte';
	import Logo from '../partials/Logo.svelte';
	import UserMenu from '../partials/UserMenu.svelte';
	import ThemeToggle from '../ThemeToggle.svelte';

	export let user: Saferwall.User | undefined;
</script>

<nav class="px-8 bg-neutral-900 w-full shadow-[0px_1px_4px_0px_rgba(13,_13,_13,_0.07)] z-40">
	<div class="container mx-auto flex items-center w-full py-5 justify-between">
		<div class="flex items-center gap-x-12 px-4 flex-grow">
			<Logo />
			<div class="hidden lg:flex max-w-[680px] flex-grow pr-12">
				<InputSearch />
			</div>
		</div>
		<div class="inline-flex items-center space-x-8">
			<ul class="hidden xl:flex space-x-8 items-center">
				<li>
					<a
						class="text-zinc-400 dark:text-zinc-500 hover:text-gray-200 dark:hover:text-gray-200"
						href="https://docs.saferwall.com/"
						target="_blank"
						rel="noreferrer"
					>
						Documentation
					</a>
				</li>
				<li>
					<a class="text-zinc-400 dark:text-zinc-500 hover:text-gray-200 dark:hover:text-gray-200" href="/hot-activities">Hot activities</a>
				</li>
			</ul>
			<ThemeToggle />
			{#if user}
				<UserMenu {user} />
			{:else}
				<div class="flex items-center gap-2">
					<div class="!hidden md:!inline-flex">
						<Button class="min-w-[100px]" href="/auth/login">Login</Button>
					</div>
					<Button class="min-w-[100px]" href="/auth/register" theme="brand">Sign up</Button>
				</div>
			{/if}
		</div>
	</div>
</nav>
