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

	let width = 0;
</script>

<svelte:window bind:innerWidth={width} />

{#if showHeader}
	<Header {isLoggedIn} />
{/if}
<Notifications />
<div class="container" style={width < 600 ? 'width: 100%;' : 'width: 65%;'}>
	<slot />
</div>

<style>
	.container {
		margin: 0 auto;
		padding: 0;
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
