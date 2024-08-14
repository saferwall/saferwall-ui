<script lang="ts">
	let year: number = new Date().getFullYear();
</script>

<footer class="w-full bg-neutral-600 text-gray-100">
	<div class="container mx-auto py-6 flex justify-between">
		<p>© {year} Saferwall. All rights reserved.</p>
		<ul class="flex space-x-3">
			<li>
				<a href="https://github.com/saferwall" target="_blank" rel="noreferrer">
					<svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 19">
						<path
							fill="currentColor"
							d="M23.24 2.53c-.84.37-1.74.61-2.65.73A4.58 4.58 0 0 0 22.6.7c-.9.53-1.89.91-2.92 1.11a4.6 4.6 0 0 0-7.87 4.2 13.05 13.05 0 0 1-9.5-4.81 4.61 4.61 0 0 0 1.42 6.16 4.55 4.55 0 0 1-2.08-.57v.05a4.63 4.63 0 0 0 3.7 4.53 4.6 4.6 0 0 1-2.1.07 4.65 4.65 0 0 0 4.32 3.22 9.26 9.26 0 0 1-6.82 1.9 12.98 12.98 0 0 0 7.07 2.06 13.03 13.03 0 0 0 13.1-13.71 9.2 9.2 0 0 0 2.31-2.4Z"
						/>
					</svg>
					<span class="sr-only">Saferwall Twitter</span>
				</a>
			</li>
			<li>
				<a href="https://twitter.com/saferwall" target="_blank" rel="noreferrer">
					<svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
						<path
							fill="currentColor"
							d="M12 2A10 10 0 0 0 2 12a10 10 0 0 0 6.84 9.49c.5.09.69-.21.69-.48l-.02-1.86c-2.51.46-3.16-.61-3.36-1.18-.11-.28-.6-1.17-1.02-1.4-.35-.2-.85-.66-.02-.67.79-.01 1.35.72 1.54 1.02.9 1.52 2.34 1.1 2.91.83a2.1 2.1 0 0 1 .64-1.34c-2.22-.25-4.55-1.11-4.55-4.94A3.9 3.9 0 0 1 6.68 8.8a3.6 3.6 0 0 1 .1-2.65s.83-.27 2.75 1.02a9.28 9.28 0 0 1 2.5-.34c.85 0 1.7.12 2.5.34 1.9-1.3 2.75-1.02 2.75-1.02.54 1.37.2 2.4.1 2.65.63.7 1.02 1.58 1.02 2.68 0 3.84-2.34 4.7-4.56 4.94.36.31.67.91.67 1.85l-.01 2.75c0 .26.19.58.69.48A10.02 10.02 0 0 0 22 12 10 10 0 0 0 12 2z"
						/>
					</svg>

					<span class="sr-only">Saferwall Github</span>
				</a>
			</li>
		</ul>
	</div>
</footer>
