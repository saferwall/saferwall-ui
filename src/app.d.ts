// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import type { Session, User } from "$lib/types";

// and what to do when importing types
declare namespace App {
	// interface Error {}
	interface Locals {
		user: User;
		session: Session;
	}
	// interface PageData {}
	interface Platform {
		env?: {
			HOT_ACTIVITIES: KVNamespace;
		};
	}
}
