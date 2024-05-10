<script lang="ts">
	import Header from '../Header/header.svelte';
	import { onNavigate } from '$app/navigation';
	import Notifications from '../Notification/notifications.svelte';

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});

	export let showHeader: boolean = true;
	export let isLoggedIn: boolean = false;
	export let center: boolean = false;
</script>

{#if showHeader}
	<Header {isLoggedIn} />
{/if}
<Notifications />
<div class="container" style={center ? 'justify-content: center;' : 'padding-top: 150px;'}>
	<slot />
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 0;
		padding: 0;
		min-height: 100vh;
	}
	@keyframes fade-in {
		from {
			opacity: 0;
		}
	}

	@keyframes fade-out {
		to {
			opacity: 0;
		}
	}

	@keyframes slide-from-right {
		from {
			transform: translateX(50px);
		}
	}

	@keyframes slide-to-left {
		to {
			transform: translateX(-50px);
		}
	}

	:root::view-transition-old(root) {
		animation:
			100ms cubic-bezier(0.4, 0, 1, 1) both fade-out,
			350ms cubic-bezier(0.4, 0, 0.2, 1) both slide-to-left;
	}

	:root::view-transition-new(root) {
		animation:
			260ms cubic-bezier(0, 0, 0.2, 1) 100ms both fade-in,
			350ms cubic-bezier(0.4, 0, 0.2, 1) both slide-from-right;
	}
</style>
