<script lang="ts">
	import BlogPreview from '$lib/components/BlogPreview/blogPreview.svelte';
	import Dropdown from '$lib/components/Dropdown/dropdown.svelte';
	import Layout from '$lib/components/Layout/layout.svelte';

	type Blogs<T> = { id: number; title: T; body: T; authorId: number | null }[];

	type T = { content: string; style: string };

	export let data;
	let blogs: Blogs<T> = data.blogs as Blogs<T>;
	let filteredBlogs: Blogs<T> = data.filteredBlogs as Blogs<T>;
	let checkbox = '';
	const checkboxes: Array<string> = ['Newest', 'Oldest', 'Highest Rated', 'Lowest Rated'];
	let mobile = 0;
</script>

<svelte:window bind:innerWidth={mobile} />

<Layout isLoggedIn={data.isLoggedIn}>
	<div style={`${mobile < 600 ? 'width: 65%;' : 'width: 100%;'}; margin: 0 auto;`}>
		{#if blogs.length}
			<form class="form" method="GET">
				<div class="topContainer">
					<input class="search" placeholder="Search Blogs..." id="search" name="search" />
					<Dropdown actionSlug="?/filterBlog">
						{#each checkboxes as input, index}
							<div>
								<input
									type="checkbox"
									id={`checkbox - ${index}`}
									name={input}
									value={input}
									checked={checkbox.length > 0 && checkbox === checkboxes[index]}
									on:change={(event) => (checkbox = event.currentTarget.value)}
								/>
								<label for={input}> {input}</label><br />
							</div>
						{/each}
					</Dropdown>
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
	</div>
</Layout>

<style>
	.blogContainer {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		place-items: center;
		grid-auto-rows: minmax(150px, auto);
		gap: 25px;
		padding-bottom: 100px;
		@media screen and (max-width: 1400px) {
			grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		}
	}
	.form {
		padding-top: 150px;
		width: 100%;
		margin: 0;
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
