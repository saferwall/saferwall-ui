<script>
	import '../app.css';

	import NProgress from 'nprogress';
	import { navigating } from '$app/stores';

	NProgress.configure({
		minimum: 0.16
	});

	$: {
		if ($navigating) {
			NProgress.start();
		}
		if (!$navigating) {
			NProgress.done();
		}
	}
</script>

<svelte:head>
	<title>Saferwall 2.0</title>
</svelte:head>

<slot />
