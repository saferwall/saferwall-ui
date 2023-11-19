<script lang="ts">
	import type { Saferwall } from '$lib/types';

	import { page } from '$app/stores';
	import Button from '../form/Button.svelte';
	import InputSearch from '../form/InputSearch.svelte';
	import Logo from './Logo.svelte';
	import UserMenu from './UserMenu.svelte';

	export let user: Saferwall.User | undefined = undefined;
</script>

<nav
	class="navbar w-full px-8 py-5 flex justify-between border-b border-gray-400 border-opacity-20"
>
	<div class="flex space-x-5 flex-grow">
		<Logo />
		<div class="navbar__search max-w-[680px] flex-grow pr-12">
			<InputSearch />
		</div>
	</div>
	<div class="inline-flex space-x-8">
		<ul class="navbar__menu space-x-8 items-center text-neutral-500">
			<li>
				<a class="menu__link" href="https://docs.saferwall.com/" target="_blank" rel="noreferrer">
					About saferwall
				</a>
			</li>
			<li>
				<a class="menu__link" href="/hot-activities">Hot activities</a>
			</li>
		</ul>
		{#if !$page.data.user}
			<div class="auth__ space-x-2">
				<div class="!hidden md:!inline-flex">
					<Button href="/auth/login">Login</Button>
				</div>
				<Button href="/auth/register" theme="primary">Sign up</Button>
			</div>
		{:else}
			<UserMenu {user} />
		{/if}
	</div>
</nav>

<style lang="scss">
	.navbar {
		&__search {
			@apply hidden lg:flex;
		}

		&__menu {
			@apply hidden xl:flex;

			a {
				@apply text-neutral-900;
			}
		}

		:global(.button) {
			@apply min-w-[100px];
		}
	}
</style>
