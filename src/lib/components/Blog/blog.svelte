<script context="module" lang="ts">
	export interface Blog {
		content: string;
		style?: string;
	}
</script>

<script lang="ts">
	import { enhance } from '$app/forms';
	import { Star, Trash } from 'lucide-svelte';
	import Tooltip from '../Tooltip/tooltip.svelte';

	export let title: Blog;
	export let body: Blog;
	export let author: string | undefined = '';
	export let create = false;
	export let stars: number | undefined = 0;
	export let isStarred: boolean | undefined = false;
	export let canLike: boolean | undefined = false;

	let localIsStarred = isStarred;

	let localStars = stars;

	const handleClick = () => {
		if (isStarred) {
			localStars = localStars = 1;
			localIsStarred = !localIsStarred;
		} else {
			localStars = (localStars || 0) + 1;
			localIsStarred = !localIsStarred;
		}
	};
</script>

{#if !create}
	<div class="container">
		<div class="titleContainer">
			<p class="title" style={title.style}>{title.content}</p>
			<form use:enhance method="POST" action="?/starBlog">
				{#if canLike}
					<button
						disabled={!canLike}
						on:click={handleClick}
						id="starButton"
						name="starButton"
						type="submit"
						class="starContainer"
					>
						<Star
							color={(() => {
								if (!canLike) {
									return 'grey';
								}
								if (localIsStarred) {
									return '#b62f2f';
								}
								return 'black';
							})()}
						/>
						<p class="starAmount" style="">{localStars}</p>
					</button>
				{/if}
				{#if !canLike}
					<Tooltip text="You need to be logged in to like this blog post.">
						<button
							disabled={!canLike}
							on:click={handleClick}
							id="starButton"
							name="starButton"
							type="submit"
							class="starContainer"
						>
							<Star
								color={(() => {
									if (!canLike) {
										return 'grey';
									}
									if (localIsStarred) {
										return '#b62f2f';
									}
									return 'black';
								})()}
							/>
							<p class="starAmount" style="">{localStars}</p>
						</button>
					</Tooltip>
				{/if}
			</form>
		</div>
		<p class="body" style={body.style}>{body.content}</p>
		<div class="footerContainer">
			<form use:enhance method="POST" action="?/deleteBlog">
				<button class="delete" id="deleteButton" name="deleteButton" type="submit">
					<Trash color="#b62f2f" />
				</button>
			</form>
			<p class="author">{author}</p>
		</div>
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
		background-color: #f9f9f9;
		width: 60%;
		height: fit-content;
		border-radius: 10px;
		box-shadow: 0px 0px 100px 80px rgba(0, 0, 0, 0.03);
		view-transition-name: blog;
	}
	.titleContainer {
		display: flex;
	}
	.starContainer {
		all: unset;
		cursor: pointer;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		&:hover {
			color: '#b62f2f';
			background-color: '#b62f2f';
		}
	}
	.starContainer:disabled {
		cursor: not-allowed;
		color: grey;
	}
	.starAmount {
		font-family: CooperHewitt-Bold;
	}
	.createContainer {
		padding: 25px 50px;
		background-color: #f9f9f9;
		width: 80%;
		height: 100%;
		border-radius: 10px;
		box-shadow: 0px 0px 100px 80px rgba(0, 0, 0, 0.03);
		view-transition-name: blog;
	}
	.title {
		font-size: 30px;
		font-family: CooperHewitt-Bold;
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
	.author {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0;
		margin: 0;
	}
	.footerContainer {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.delete {
		all: unset;
		cursor: pointer;
	}
</style>
