<script>
	import { goto } from '$app/navigation';
	import Layout from '$lib/components/Layout/layout.svelte';
	import LoginCard from '$lib/components/LoginCard/loginCard.svelte';
	import { addNotification } from '$lib/stores/notifications';

	export let form;

	$: console.log(form);

	$: if (form?.message)
		addNotification(
			form?.message || 'Account registered',
			form?.success === false ? 'error' : 'success'
		);
	$: if (form?.success === true) goto('/');
</script>

<Layout showHeader={false}>
	<div class="container">
		<LoginCard register />
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
