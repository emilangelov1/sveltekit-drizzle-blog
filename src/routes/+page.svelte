<script lang="ts">
	import BlogPreview from '$lib/components/BlogPreview/blogPreview.svelte';
	import Layout from '$lib/components/Layout/layout.svelte';
	import { ArrowRight } from 'lucide-svelte';
	import { cubicInOut } from 'svelte/easing';
	import { tweened } from 'svelte/motion';

	type Blogs<T> = { id: number; title: T; body: T; authorId: number | null }[];

	type T = { content: string; style: string };

	export let data;
	let dropDownVisible: boolean = false;
	const rotation = tweened(0, {
		duration: 350,
		easing: cubicInOut
	});
	const height = tweened(0, {
		duration: 350,
		easing: cubicInOut
	});
	let blogs: Blogs<T> = data.blogs as Blogs<T>;
	let filteredBlogs: Blogs<T> = data.filteredBlogs as Blogs<T>;
</script>

<Layout isLoggedIn={data.isLoggedIn}>
	{#if blogs.length}
		<form class="form" method="GET">
			<div class="topContainer">
				<input class="search" placeholder="Search Blogs..." id="search" name="search" />
				<div class="filterContainer">
					<button
						class="filter"
						type="button"
						on:click={() => (
							(dropDownVisible = !dropDownVisible),
							rotation.set(dropDownVisible ? 90 : 0),
							height.set(dropDownVisible ? 250 : 0)
						)}
						>Filter <ArrowRight style="transform: rotate({$rotation}deg)" />
					</button>
					<form
						class="dropdown"
						style="height: {$height}px; visibility: {dropDownVisible ? 'visible' : 'hidden'}"
					>
						<input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
						<label for="vehicle1"> Newest</label><br />
						<input type="checkbox" id="vehicle2" name="vehicle2" value="Car" />
						<label for="vehicle2"> Highest Rated</label><br />
						<input type="checkbox" id="vehicle3" name="vehicle3" value="Boat" />
						<label for="vehicle3"> Lowest Rated</label><br /><br />
						<input type="submit" value="Submit" />
					</form>
				</div>
			</div>
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
	{/if}
	{#if !blogs.length}
		<div class="noBlogs">
			<p>No blogs found...</p>
			<a
				class="emptyCreate"
				href={data.isLoggedIn ? '/createBlog' : '/login/?redirect=/createBlog'}
			>
				Create a new blog</a
			>
		</div>
	{/if}
</Layout>

<style>
	.blogContainer {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		place-items: center;
		grid-auto-rows: minmax(150px, auto);
		gap: 25px;
		width: 70%;
		@media screen and (max-width: 1400px) {
			grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		}
	}
	.filter {
		all: unset;
		display: flex;
		flex-direction: row;
		cursor: pointer;
		gap: 10px;
	}
	.filterContainer {
		position: relative;
		display: inline-block;
	}
	.form {
		width: 65%;
		padding: 0;
		margin: 0;
	}
	.dropdown {
		background-color: #f9f9f9;
		box-shadow: 0px 0px 20px 10px rgba(0, 0, 0, 0.05);
		position: absolute;
		z-index: 1;
		width: 200px;
		top: 50px;
		right: 0;
		border-radius: 5px;
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
	.topContainer {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		gap: 50px;
		margin: 0px 0px 150px 0px;
	}
	.noBlogs {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
		font-family: CooperHewitt-Medium, sans-serif;
		font-size: 30px;
		text-align: center;
		flex-direction: column;
	}
	.emptyCreate {
		all: unset;
		background-color: #b62f2f;
		border-radius: 2px;
		height: 30px;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
		font-family: CooperHewitt-Medium;
		color: #f9f9f9;
		font-size: 20px;
		padding: 10px;
		transition: 0.5s all cubic-bezier(0.2, 0.9, 0.3, 1);
		&:hover {
			background-color: #972f2f;
		}
	}
</style>
