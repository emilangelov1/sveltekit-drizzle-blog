<script lang="ts">
	import { goto } from '$app/navigation';
	import Layout from '$lib/components/Layout/layout.svelte';
	import LoginCard from '$lib/components/LoginCard/loginCard.svelte';
	import { addNotification } from '$lib/stores/notifications';

	export let form;
	const redirect = (): string => {
		if (!window) return '';
		return window.location.search.split('=')[1];
	};
	$: if (form?.message)
		addNotification(form?.message, form?.success === false ? 'error' : 'success');
	$: if (form?.success === true && !window.location.search.includes('redirect')) goto('/');
	$: if (form?.success === true && window.location.search.includes('redirect')) goto(redirect());
</script>

<Layout showHeader={false}>
	<div class="container">
		<LoginCard register={false} />
	</div>
</Layout>

<style>
	.container {
		display: flex;
		width: 100%;
		align-items: center;
		justify-content: center;
		height: 100vh;
	}
</style>
