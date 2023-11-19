<script lang="ts">
	import type { Saferwall } from '$lib/types';
	import Avatar from '../Avatar.svelte';
	import Icon from '../Icon.svelte';

	let open = false;
	export let user: Saferwall.User | undefined = undefined;

	$: username = user?.username;

	const clickOutside = (node: Node, { enabled: initialEnabled, cb }: any) => {
		const handleOutsideClick = ({ target }: any) => {
			if (!node.contains(target)) {
				cb();
			}
		};

		function update({ enabled }: { enabled: boolean }) {
			if (enabled) {
				window.addEventListener('click', handleOutsideClick);
			} else {
				window.removeEventListener('click', handleOutsideClick);
			}
		}

		update({ enabled: initialEnabled });
		return {
			update,
			destroy() {
				window.removeEventListener('click', handleOutsideClick);
			}
		};
	};
</script>

<div
	class="relative flex justify-center cursor-pointer z-40"
	use:clickOutside={{ enabled: open, cb: () => (open = false) }}
>
	<div class="flex items-center space-x-3" on:mouseup={() => (open = !open)}>
		<Avatar {username} size="xs" />
		<span class="text-lg">{username}</span>
	</div>

	{#if open}
		<ul
			class="absolute top-14 -right-4 bg-white py-4 rounded shadow drop-shadow-xl"
			data-sveltekit-preload-data="tap"
		>
			<li class="user__menu__item">
				<a class="menu__link" href="/account/profile">
					<Icon name="user" />
					<span class="menu__label">Profile</span>
				</a>
			</li>
			<li class="user__menu__item">
				<a class="menu__link" href="/account/settings">
					<Icon name="cog" />
					<span class="menu__label">Settings</span>
				</a>
			</li>
			<li class="user__menu__item">
				<a data-sveltekit-reload class="menu__link" href="/auth/logout">
					<Icon name="logout" />
					<span class="menu__label">Logout</span>
				</a>
			</li>
		</ul>
	{/if}
</div>

<style lang="scss">
	.user__menu__item {
		@apply w-44;
		@apply font-normal text-lg text-neutral-800;

		.menu__link {
			@apply flex items-center;
			@apply py-3 px-6;
		}

		.menu__label {
			@apply ml-4;
		}

		&:hover {
			@apply cursor-pointer;
			@apply bg-primary-50 text-primary;
		}
	}
</style>
