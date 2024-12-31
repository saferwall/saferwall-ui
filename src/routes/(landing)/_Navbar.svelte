<script lang="ts">
	import { page } from "$app/stores";
	import Button from "$lib/components/form/Button.svelte";
	import Logo from "$lib/components/partials/Logo.svelte";

	let navText = [
		{
			text: "home",
			href: "/",
			get selected() { return $page.url.pathname == "/" }
		},
		{
			text: "highlights",
			href: "about:blank",
			get selected() { return false }
		},
		{
			text: "features",
			href: "about:blank",
			get selected() { return false }
		},
		{
			text: "contact",
			href: "/contact",
			get selected() { return $page.url.pathname.startsWith("/contact") }
		},
	]
</script>

<nav class="container mx-auto py-[1.125rem] px-4">
	<ul class="flex justify-between items-center">
		<li class="flex justify-center items-center">
			<Logo class="w-[110px] min-h-[37px] text-[#E8E8E8]"></Logo>
		</li>
		<li>
			<ul class="flex md:gap-8 gap-5 items-center">
				{#key $page.url.pathname}
					{#each navText as {text, href, selected}}
						<li class="hidden md:block capitalize text-[#969696] hover:text-[#DBDBDB] [&.selected]:text-[#DBDBDB]" class:selected>
							<a {href}>
								{text}
							</a>
						</li>
					{/each}
				{/key}
				<li>
					<Button class="bg-[#5F4CD9] text-white rounded-[8px] font-semibold px-4.5 py-[6px] leading-[25px] border-none">
						Start&nbsp;
						<span class="hidden min-[350px]:block">
							an analysis
						</span>
					</Button>
				</li>
				<li class="md:hidden flex justify-center items-center">
					<Button icon="burger-menu" class="p-0 border-none" iconClass="size-8"></Button>
				</li>
			</ul>
		</li>
	</ul>
</nav>