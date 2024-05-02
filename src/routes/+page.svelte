<script lang="ts">
	import { enhance } from '$app/forms';
	import BlogPreview from '$lib/components/BlogPreview/blogPreview.svelte';
	import Layout from '$lib/components/Layout/layout.svelte';
	import '../global.css';

	type Blogs<T> = { id: number; title: T; body: T; authorId: number | null }[];

	type T = { content: string; style: string };

	export let data;
	let blogs: Blogs<T> = data.blogs as Blogs<T>;
	let filteredBlogs: Blogs<T> = data.filteredBlogs as Blogs<T>;
</script>

<Layout>
	<form class="form" method="GET">
		<label for="search">Search:</label>
		<input class="search" placeholder="Search Blogs..." id="search" name="search" />
	</form>
	<div class="blogContainer">
		{#each data.filteredBlogs.length ? filteredBlogs : blogs as blog}
			<BlogPreview
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
	.search {
		view-transition-name: searchBlogs;
		all: unset;
		display: flex;
		align-items: center;
		width: 100%;
		text-wrap: wrap;
		height: 35px;
		border: 1.5px solid #b62f2f;
		border-radius: 3px;
		transition: box-shadow 0.5s cubic-bezier(0.2, 0.9, 0.3, 1.5);
		&:focus {
			border: 2px solid #b62f2f;
			box-shadow: 0px 0px 20px 10px rgba(0, 0, 0, 0.05);
		}
	}
	.form {
		display: flex;
		width: 65%;
		flex-direction: column;
		margin: 0px 0px 150px 0px;
	}
</style>
