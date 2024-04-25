<script lang="ts">
	import Blog from '$lib/components/Blog/blog.svelte';
	import Layout from '$lib/components/Layout/layout.svelte';

	export let data;
	console.log(data);
</script>

<Layout>
	<Blog authorId={data.blog.authorId} body={data.blog.body} title={data.blog.title} />
</Layout>
