<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import CreateEdit from '$lib/components/CreateEdit/createEdit.svelte';
	import Layout from '$lib/components/Layout/layout.svelte';
	export let form;

	$: form && form?.success === true && goto(`/blog/${form?.id}`);
</script>

<Layout center>
	<CreateEdit />
</Layout>
