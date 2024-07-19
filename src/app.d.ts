// See https://kit.svelte.dev/docs/types#app

import type { Saferwall } from '$lib/types';
import type { SaferwallClient } from '$lib/clients/saferwall';

declare global {
	declare namespace App {
		interface Error {
			message?: string;
			status?: number;
		}

		interface Locals {
			client: SaferwallClient;
			session?: Saferwall.Session;
			user?: Saferwall.User;
		}
		interface Platform {
			env?: {
				HOT_ACTIVITIES: KVNamespace;
			};
		}
	}
}
