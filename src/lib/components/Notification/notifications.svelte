<script>
	import { notifications } from '$lib/stores/notifications';
	import Notification from './notification.svelte';
</script>

{#each $notifications as notification, i}
	<Notification top={i * 100} message={notification.message} type={notification.type} />
{/each}
