<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import Button from '$lib/components/form/Button.svelte';
	import Logo from '$lib/components/partials/Logo.svelte';

	let navText = [
		{
			text: 'home',
			href: '/',
			get selected() {
				return $page.url.pathname == '/' && $page.url.hash === "";
			}
		},
		{
			text: 'highlights',
			href: '/#highlights',
			get selected() {
				return $page.url.hash === this.href.substring(1);
			}
		},
		{
			text: 'features',
			href: '/#features',
			get selected() {
				return $page.url.hash === this.href.substring(1);
			}
		},
		{
			text: 'contact',
			href: '/contact',
			get selected() {
				return $page.url.pathname.startsWith('/contact');
			}
		}
	];
	export let menuOpen = false;
</script>

<div class:menuOpen class="w-full sticky top-0 z-20 bg-[#0D0D0D]">
	<div class:menuOpen class="relative z-10 [&.menuOpen]:bg-[#111111]">
		<div class="flex justify-center">
			<nav class:menuOpen class="container landing-container py-[1.125rem] mx-landing">
				<div class="flex flex-col gap-8 w-full">
					<ul class="flex justify-between items-center">
						<li class="flex justify-center items-center">
							<Logo class="w-[110px] min-h-[37px] text-[#E8E8E8]"></Logo>
						</li>
						<li>
							<ul class="flex md:gap-8 gap-5 items-center">
								{#key $page.url}
									{#each navText as { text, href, selected }}
										<li
											class:menuOpen
											class="hidden md:block [&.menuOpen]:hidden capitalize text-[#969696] hover:text-[#DBDBDB] [&.selected]:text-[#DBDBDB]"
											class:selected
										>
											<a {href}>
												{text}
											</a>
										</li>
									{/each}
								{/key}
								<li>
									<Button
										theme="brand"
										class="text-white rounded-[8px] font-semibold px-4.5 py-[6px] leading-[25px] border-none"
										href="/app"
										on:click={() => invalidateAll()}
									>
										Start&nbsp;
										<span class="hidden min-[350px]:block"> an analysis </span>
									</Button>
								</li>
								<li class:menuOpen class="md:hidden [&.menuOpen]:flex flex justify-center items-center">
									<Button
										icon={!menuOpen ? 'burger-menu' : 'close-2'}
										class="p-0 border-none"
										iconClass="size-8"
										on:click={() => (menuOpen = !menuOpen)}
									></Button>
								</li>
							</ul>
						</li>
					</ul>
					<ul
						class:menuOpen
						class="
									hidden [&.menuOpen]:flex
									flex-col items-center gap-3
									max-w-full w-full
									absolute top-full left-0
									bg-[#111111]
									pb-6 pt-4"
					>
						{#key $page.url}
							{#each navText as { text, href, selected }}
								<li
									class="capitalize text-[14px] text-transparent leading-6"
									class:selected
								>
									<a {href} on:click={() => (menuOpen = false)}>
										{text}
									</a>
								</li>
							{/each}
						{/key}
					</ul>
				</div>
			</nav>
		</div>
	</div>
	<div class:menuOpen class="--relative z-0 hidden [&.menuOpen]:block absolute top-0 left-0 h-[100vh] w-full bg-[#0D0D0D]/80"></div>
	<div class:menuOpen class="--relative z-10 absolute top-0 left-0 hidden [&.menuOpen]:block --flex-col --items-center w-full [backdrop-filter:blur(30px)]">
		<div class="flex justify-center">
			<nav class:menuOpen class="container landing-container mx-landing py-[1.125rem] bg-transparent [&.menuOpen]:pb-0">
				<div class="flex flex-col gap-8 w-full">
					<ul class="flex justify-between items-center">
						<li class="flex justify-center items-center">
							<Logo class="w-[110px] min-h-[37px] text-[#E8E8E8]"></Logo>
						</li>
						<li>
							<ul class="flex md:gap-8 gap-5 items-center">
								{#key $page.url}
									{#each navText as { text, href, selected }}
										<li
											class:menuOpen
											class="hidden md:block [&.menuOpen]:hidden capitalize text-[#969696] hover:text-[#DBDBDB] [&.selected]:text-[#DBDBDB]"
											class:selected
										>
											<a {href}>
												{text}
											</a>
										</li>
									{/each}
								{/key}
								<li>
									<Button
										theme="brand"
										class="text-white rounded-[8px] font-semibold px-4.5 py-[6px] leading-[25px] border-none"
										href="/app"
										on:click={() => invalidateAll()}
									>
										Start&nbsp;
										<span class="hidden min-[350px]:block"> an analysis </span>
									</Button>
								</li>
								<li class:menuOpen class="md:hidden [&.menuOpen]:flex flex justify-center items-center">
									<Button
										icon={!menuOpen ? 'burger-menu' : 'close-2'}
										class="p-0 border-none"
										iconClass="size-8"
										on:click={() => (menuOpen = !menuOpen)}
									></Button>
								</li>
							</ul>
						</li>
					</ul>
					<ul
						class:menuOpen
						class="
								flex
								flex-col items-center gap-3
								max-w-full w-full
								pb-6"
					>
						{#key $page.url}
							{#each navText as { text, href, selected }}
								<li
									class="capitalize text-[14px] text-[#969696] hover:text-[#DBDBDB] [&.selected]:text-[#DBDBDB] leading-6"
									class:selected
								>
									<a {href} on:click={() => (menuOpen = false)}>
										{text}
									</a>
								</li>
							{/each}
						{/key}
					</ul>
				</div>
			</nav>
		</div>
	</div>
</div>
