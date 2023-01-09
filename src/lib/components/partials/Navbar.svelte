<script>
	import Button from '../form/Button.svelte';
	import Logo from './Logo.svelte';
	import InputSearch from '../form/InputSearch.svelte';
</script>

<nav
	class="navbar w-full px-8 py-5 flex justify-between border-b border-gray-400 border-opacity-20"
>
	<div class="flex space-x-5">
		<Logo />
		<div class="navbar__search w-80">
			<InputSearch />
		</div>
	</div>
	<div class="inline-flex space-x-8">
		<ul class="navbar__menu space-x-8 items-center text-grayx-500">
			<li>
				<a class="menu__link" href="https://about.saferwall.com/" target="_blank" rel="noreferrer">
					About saferwall
				</a>
			</li>
			<li>
				<a class="menu__link" href="/hot-activities">Hot activities</a>
			</li>
		</ul>
		<div class="auth__ space-x-2">
			<div class="!hidden md:!inline-flex">
				<Button href="/auth/login" m>Login</Button>
			</div>
			<Button href="/auth/register" theme="primary">Sign up</Button>
		</div>
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
				@apply text-grayx-900;
			}

			&__link {
				@apply hover:text-grayx-600;
			}
		}

		:global(.button) {
			@apply min-w-[100px];
		}
	}
</style>
