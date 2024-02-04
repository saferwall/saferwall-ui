<script lang="ts">
	import TableKeyValue from '$lib/components/TableKeyValue.svelte';
	import ValidityBox from '$lib/components/ValidityBox.svelte';
	import { translateGroupValue, valueToHex } from '$lib/utils';
	import type { PageData } from './$types';

	export let data: PageData;

	$: certificate = data.security;

	$: headers = [
		['Length', valueToHex(certificate.Header.Length)],
		['Revision', valueToHex(certificate.Header.Revision)],
		[
			'CertificateType',
			translateGroupValue(certificate.Header.CertificateType, 'Certificate', 'CertificateType')
		]
	];

	$: signer = [
		['Issuer Name', valueToHex(certificate.Info.Issuer)],
		['Subject', valueToHex(certificate.Info.Subject)],
		['Validity From', [certificate.Info.NotBefore, certificate.Info.NotAfter].join(' to ')],
		['Serial Number', certificate.Info.SerialNumber],
		[
			'Signature Algorithm',
			translateGroupValue(certificate.Info.SignatureAlgorithm, 'Certificate', 'Signature Algorithm')
		],
		[
			'PublicKey Algorithm',
			translateGroupValue(certificate.Info.PublicKeyAlgorithm, 'Certificate', 'PublicKey Algorithm')
		]
	];

	$: verified = certificate.Verified;
</script>

<section class="divide-y">
	<article>
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
						<ValidityBox signed={true} valid={verified} />
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

<style lang="scss">
	table {
		@apply w-full;

		tbody tr {
			td {
				@apply py-3;

				&:first-child {
					@apply lg:w-1/4 font-bold;
				}
			}
		}
	}

	article {
		@apply space-y-4 py-10;

		&:first-child {
			@apply pt-0;
		}
	}
</style>
