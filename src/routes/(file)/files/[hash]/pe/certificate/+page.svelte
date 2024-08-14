<script lang="ts">
	import TableKeyValue from '$lib/components/TableKeyValue.svelte';
	import ValidityBox from '$lib/components/ValidityBox.svelte';
	import { translateGroupValue, valueToHex } from '$lib/utils';
	import type { PageData } from './$types';

	export let data: PageData;

	$: certificate = data.security;

	$: headers = [
		['Length', valueToHex(certificate.header.length)],
		['Revision', valueToHex(certificate.header.revision)],
		[
			'Certificate Type',
			translateGroupValue(certificate.header.certificate_type, 'certificate', 'certificate_type')
		]
	];

	$: signer = [
		['Issuer Name', valueToHex(certificate.info.issuer)],
		['Subject', valueToHex(certificate.info.subject)],
		['Validity From', [certificate.info.notBefore, certificate.info.not_after].join(' to ')],
		['Serial Number', certificate.info.serial_number],
		[
			'Signature Algorithm',
			translateGroupValue(
				certificate.info.signature_algorithm,
				'certificate',
				'signature_algorithm'
			)
		],
		[
			'PublicKey Algorithm',
			translateGroupValue(
				certificate.info.public_key_algorithm,
				'certificate',
				'public_key_algorithm'
			)
		]
	];

	$: verified = certificate.verified;
</script>

<section class="divide-y">
	<article class="border-t-zinc-300 dark:border-t-zinc-700">
		<h1 class="title">Certificate</h1>
		<table class="w-full">
			<tbody>
				{#each headers as [title, value]}
					<tr>
						<td>{title}</td>
						<td>{value}</td>
					</tr>
				{/each}
				<tr>
					<td>Validity</td>
					<td>
						<ValidityBox signed={true} valid={false} />
					</td>
				</tr>
			</tbody>
		</table>
	</article>

	<article>
		<h1 class="title">Signer Certificate</h1>
		<div>
			<TableKeyValue items={signer} />
		</div>
	</article>
</section>

<style lang="postcss">
	table {
		@apply w-full;

		tbody tr {
			td {
				@apply py-2;

				&:first-child {
					@apply lg:w-1/4 font-bold;
				}
			}
		}
	}

	article {
		@apply space-y-4 border-zinc-300 dark:border-zinc-700 py-10;

		&:first-child {
			@apply pt-0;
		}
	}
</style>
