<script lang="ts">
	import { page } from '$app/stores';

	const randomQuote: string[] = [
		"Oops! It looks like we've hit a glitch in the system. Don't worry, our team is on it. If you're still experiencing errors, please don't hesitate to contact us.",
		"Something's not quite right...but don't worry, we're on the case! If you're still having issues, please get in touch with our team.",
		"Uh oh, it looks like we've encountered a bit of a snag. Our team is hard at work fixing it as we speak. If you're still experiencing errors, please reach out to us.",
		"Looks like we've run into a bit of a hiccup. Hang tight while we work on getting things back to normal. If you're still encountering issues, please contact our team.",
		"Whoops, it looks like something's gone awry. Don't worry, we're on it and everything will be up and running again soon. If you're still experiencing errors, please don't hesitate to reach out to us."
	][Math.floor(Math.random() * 5)];
</script>

<section class="flex flex-col space-x-6 items-center justify-center flex-1">
	<div class="max-w-screen-sm w-full p-4">
		<h4 class="text-xl text-grayx-500">Oops! <span class="text-sm">{$page.status}</span></h4>
		<h3 class="text-3xl text-redx">
			{$page.error?.message}
		</h3>

		<p class="italic text-gray-500 mt-8 text-sm">
			{randomQuote}
		</p>
	</div>
</section>
