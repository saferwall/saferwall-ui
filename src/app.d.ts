// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	interface Error {
		status?: number;
	}

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
