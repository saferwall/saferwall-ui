<script>
	import Button from '$lib/components/form/Button.svelte';
	import Input from '$lib/components/form/Input.svelte';
</script>

<form class="flex flex-col space-y-6 px-10 lg:px-16 pt-14">
	<h1 class="text-3xl font-bold">Sign up</h1>
	<div class="space-y-4">
		<Input label="Username" />
		<Input label="Email" type="email" />
		<Input label="Password" type="password" />
	</div>
	<label class="flex items-center space-x-2 text-sm">
		<input type="checkbox" />
		<p>I agree to the <a href="/pages/terms-of-service">Terms of Service</a></p>
	</label>
	<Button theme="primary" size="large">Create account</Button>
</form>
<div class="border-t border-grayx-100 p-6">
	<p class="text-center text-sm">
		already have an account ? <a href="/auth/login" class="link">Sign In</a>
	</p>
</div>
