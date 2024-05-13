<script lang="ts">
	import { goto } from '$app/navigation';
	import CreateEdit from '$lib/components/CreateEdit/createEdit.svelte';
	import Layout from '$lib/components/Layout/layout.svelte';
	export let form;

	$: form && form?.success === true && goto(`/blog/${form?.id}`);
</script>

<Layout isLoggedIn>
	<div class="container">
		<CreateEdit />
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
