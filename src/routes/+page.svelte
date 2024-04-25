<script lang="ts">
	import Blog from '$lib/components/BlogPreview/blogPreview.svelte';
	import Layout from '$lib/components/Layout/layout.svelte';
	import '../global.css';

	export let data;
	console.log(data.blogs);
	let filteredBlogs = data.blogs;
	function handleSearch(event: Event & { currentTarget: EventTarget & HTMLInputElement }) {
		filteredBlogs = data.blogs.filter((e) =>
			e.title.toLowerCase().includes(event?.currentTarget?.value.toLowerCase())
		);
	}
</script>

<Layout>
	<label for="search">Search:</label><br />
	<input on:input={handleSearch} placeholder="Search Blogs..." id="search" name="search" />
	<div class="blogContainer">
		{#each filteredBlogs as blog}
			<Blog
				blog={{
					id: blog.id,
					title: blog.title,
					body: blog.body,
					author: {
						id: 0,
						name: 'author'
					}
				}}
			/>
		{/each}
	</div>
	<form action="?/createBlog" method="POST">
		<label for="title">Title:</label><br />
		<input type="text" id="title" name="title" /><br /><br />

		<label for="body">Body:</label><br />
		<textarea id="body" name="body" rows="4" cols="50"></textarea><br /><br />

		<input type="submit" value="Submit" />
	</form>
</Layout>

<style>
	.blogContainer {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		place-items: center;
		grid-auto-rows: minmax(150px, auto);
		gap: 10px;
		width: 70%;
		@media screen and (max-width: 1200px) {
			grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		}
	}
</style>
