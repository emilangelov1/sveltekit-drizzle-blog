// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			role: 'user' | 'guest';
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
	interface Document {
		startViewTransition(callback: () => void): void;
	}
}

export {};
