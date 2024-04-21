<script>
	import Blog from '$lib/components/Blog/blog.svelte';
	import '../global.css';

	export let data;
	console.log(data.blogs);
</script>

<div>
	<p>
		{#each data.blogs as blog}
			<Blog title={blog.title} body={blog.body} authorId={blog.authorId} />
		{/each}
	</p>
	<form action="?/createBlog" method="POST">
		<label for="title">Title:</label><br />
		<input type="text" id="title" name="title" /><br /><br />

		<label for="body">Body:</label><br />
		<textarea id="body" name="body" rows="4" cols="50"></textarea><br /><br />

		<input type="submit" value="Submit" />
	</form>
</div>
