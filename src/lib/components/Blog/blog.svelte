<script context="module" lang="ts">
	export interface Blog {
		content: string;
		style?: string;
	}
</script>

<script lang="ts">
	import { enhance } from '$app/forms';
	import { Star } from 'lucide-svelte';

	export let title: Blog;
	export let body: Blog;
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
					<p class="starAmount">{localStars}</p>
				</button>
			</form>
		</div>
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
		background-color: white;
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
</style>
