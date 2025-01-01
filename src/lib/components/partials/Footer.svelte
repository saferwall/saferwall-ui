<script lang="ts">
	import Icon from "../Icon.svelte";

	let year: number = new Date().getFullYear();
</script>

<footer class="w-full bg-neutral-600 text-gray-100">
	<div class="container mx-auto py-6 flex justify-between">
		<p>© {year} Saferwall. All rights reserved.</p>
		<ul class="flex space-x-3">
			<li>
				<a href="https://github.com/saferwall" target="_blank" rel="noreferrer">
					<Icon name="github-logo" class="size-6"></Icon>
					<span class="sr-only">Saferwall Github</span>
				</a>
			</li>
			<li>
				<a href="https://x.com/saferwall" target="_blank" rel="noreferrer">
					<Icon name="x-logo" class="size-6"></Icon>

					<span class="sr-only">Saferwall X</span>
				</a>
			</li>
		</ul>
	</div>
</footer>
