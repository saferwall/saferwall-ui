<script>
	import ButtonBrowse from './ButtonBrowse.svelte';
</script>

<section class="upload__ bg-white rounded-xl shadow p-12 flex flex-col justify-between">
	<h1 class="text-xl font-medium">Welcome to Saferwall</h1>

	<div class="flex h-80 flex-col items-center justify-center">
		<div class="m-auto w-max h-max">
			<ButtonBrowse />
		</div>
	</div>

	<div class="m-auto text-center max-w-screen-md">
		<p class="px-8">
			By using Saferwall you consent to our <a class="link" href="/">Terms of Service</a> and
			<a class="link" href="/">Privacy Policy</a> and allow us to share your submission with the security
			community. Learn more
		</p>
	</div>
</section>
