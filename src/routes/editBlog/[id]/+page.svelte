<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import CreateEdit from '$lib/components/CreateEdit/createEdit.svelte';
	import { type Blog } from '$lib/components/Blog/blog.svelte';
	import Layout from '$lib/components/Layout/layout.svelte';
	type Data = {
		blog: {
			body: Blog;
			title: Blog;
		};
	};
	export let form;
	export let data: Data;
	let body = {
		content: data.blog?.body?.content,
		style: [data.blog?.body.style]
	} as {
		content: '';
		style: [''];
	};
	let title = { content: data.blog?.title?.content, style: [data.blog?.title.style] } as {
		content: '';
		style: [''];
	};

	$: form && form?.success === true && browser && goto(`/blog/${form?.id}`);
</script>

<Layout>
	<CreateEdit {body} {title} />
</Layout>
