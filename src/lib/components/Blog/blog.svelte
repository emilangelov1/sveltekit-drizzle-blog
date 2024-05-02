<script context="module" lang="ts">
	export interface Blog {
		content: string;
		style?: string;
	}
</script>

<script lang="ts">
	export let title: Blog;
	export let body: Blog;
	export let authorId: number | undefined;
	export let create = false;
</script>

{#if !create}
	<div class="container">
		<p class="title" style={title.style}>{title.content}</p>
		<p class="body" style={body.style}>{body.content}</p>
	</div>
{/if}
{#if create}
	<div class="createContainer">
		<p style={title.style} class="title">{title.content}</p>
		<p class="body" style={body.style}>{body.content}</p>
	</div>
{/if}

<style>
	.container {
		padding: 25px 50px;
		background-color: white;
		width: 50%;
		height: 50%;
		border-radius: 10px;
		box-shadow: 0px 0px 100px 80px rgba(0, 0, 0, 0.03);
		view-transition-name: blog;
	}
	.createContainer {
		padding: 25px 50px;
		background-color: white;
		width: 80%;
		height: 100%;
		border-radius: 10px;
		box-shadow: 0px 0px 100px 80px rgba(0, 0, 0, 0.03);
		view-transition-name: blog;
	}
	.title {
		font-size: 30px;
		font-family: 'CooperHewitt-Bold';
		text-wrap: wrap;
		width: 100%;
		word-wrap: break-word;
	}
	.body {
		font-size: 18px;
		text-wrap: wrap;
		width: 100%;
		word-wrap: break-word;
	}
</style>
