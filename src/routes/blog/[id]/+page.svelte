<script lang="ts">
	import Blog, { type Blog as BlogType } from '$lib/components/Blog/blog.svelte';
	import Layout from '$lib/components/Layout/layout.svelte';

	export let data;
	let actualTitle = data?.blog?.title as BlogType;
	let actualBody = data?.blog?.body as BlogType;
</script>

<Layout isLoggedIn={data.canLike}>
	<div class="container">
		<Blog
			blogId={data.blog.id}
			hasPermissions={data.hasPermissions}
			author={data?.author}
			canLike={data.canLike}
			isStarred={data.isStarred}
			body={actualBody}
			title={actualTitle}
			stars={data?.starsCount}
		/>
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
