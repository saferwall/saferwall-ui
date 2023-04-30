<script lang="ts">
	import ButtonBrowse from './form/ButtonBrowse.svelte';

	export let loggedIn: boolean = false;
</script>

<section class="upload__ bg-white rounded-xl shadow p-8 md:p-12 flex flex-col justify-between">
	<h1 class="text-xl font-medium">Welcome to Saferwall</h1>

	<div class="flex h-80 flex-col items-center justify-center">
		<div class="m-auto w-max h-max">
			<ButtonBrowse href={loggedIn ? undefined : '/auth/login'} />
		</div>
	</div>

	<div class="m-auto text-center max-w-screen-md">
		<p class="text-sm md:text-base md:px-8">
			By using Saferwall you consent to our
			<a class="link" target="_blank" rel="noreferrer" href="/pages/terms-of-service"
				>Terms of Service</a
			>
			and
			<a class="link" target="_blank" rel="noreferrer" href="/pages/privacy-and-policy"
				>Privacy Policy</a
			> and allow us to share your submission with the security community. Learn more
		</p>
	</div>
</section>
