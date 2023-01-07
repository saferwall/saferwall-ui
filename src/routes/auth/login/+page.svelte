<script>
	import Button from '$lib/components/form/Button.svelte';
	import Input from '$lib/components/form/Input.svelte';
</script>

<form class="flex flex-col space-y-6 px-10 lg:px-16 pt-14">
	<h1 class="text-3xl font-bold">Sign in</h1>
	<div class="space-y-4">
		<Input label="Username or email" />
		<Input label="Password" type="password" />
	</div>
	<a href="/auth/forget-password" class="self-end border-l-pink-50">Forget password?</a>
	<Button theme="primary" size="large">Login</Button>
	<p class="text-center text-sm">
		Didn't confirm registration? <a href="/auth/confirm" class="link">Send confirmation</a>
	</p>
</form>
<div class="border-t border-grayx-100 p-6">
	<p class="text-center text-sm">
		Not a member ? <a href="/auth/register" class="link">Create your account</a>
	</p>
</div>
