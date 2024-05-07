<script lang="ts">
	import Blog, { type Blog as BlogType } from '$lib/components/Blog/blog.svelte';
	import Layout from '$lib/components/Layout/layout.svelte';

	export let data;
	let actualTitle = data?.blog?.title as BlogType;
	let actualBody = data?.blog?.body as BlogType;
	console.log({ data });
</script>

<Layout>
	<Blog
		canLike={data.canLike}
		isStarred={data.isStarred}
		body={actualBody}
		title={actualTitle}
		stars={data?.starsCount}
	/>
</Layout>
