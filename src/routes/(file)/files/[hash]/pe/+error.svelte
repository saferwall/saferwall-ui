<script lang="ts">
	import { page } from '$app/stores';
</script>

<section class="flex flex-col space-x-6 h-full flex-1">
	<div class="max-w-screen-sm w-full p-4">
		<h4 class="text-xl text-grayx-500">Oops! <span class="text-sm">{$page.status}</span></h4>
		<h3 class="text-3xl text-redx">
			{$page.error?.message}
		</h3>
	</div>
</section>
