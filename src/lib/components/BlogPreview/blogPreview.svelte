<script lang="ts">
	import viewport from '$lib/hooks/useViewportAction';
	import { theme } from '$lib/stores/themes';
	export let blog = {
		id: 0,
		title: {
			content: '',
			style: ''
		},
		author: {
			name: '',
			id: 0
		},
		body: {
			content: '',
			style: ''
		}
	};
	export let author = {
		name: '',
		id: 0
	};
	const randomNumberBetween = (min: number, max: number) => {
		return Math.floor(Math.random() * (max - min + 1) + min);
	};
	let visible = false;
</script>

<div
	use:viewport
	on:exitViewport={() => {
		visible = false;
	}}
	on:enterViewport={() => {
		visible = true;
	}}
	class="container"
	style="opacity: {visible ? 1 : 0}"
>
	<div class="topContainer">
		<p class="title" style={blog.title.style}>{blog.title.content}</p>
	</div>
	<p class="body" style={blog.body.style}>
		{blog.body.content?.slice(0, randomNumberBetween(100, 500))}...
	</p>
	<div class="bottomContainer">
		<p class="author">{author.name}</p>
		<a href="/blog/{blog.id}" style="color: {theme.accent}" class="readMore">Read More</a>
	</div>
</div>

<style>
	.container {
		display: flex;
		height: fit-content;
		flex-direction: column;
		justify-content: space-between;
		word-wrap: wrap;
		text-wrap: wrap;
		padding: 25px 35px;
		background-color: #f9f9f9;
		width: 250px;
		border-radius: 10px;
		box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.06);
		transition:
			opacity 1s,
			box-shadow 0.5s cubic-bezier(0.2, 0.9, 0.3, 1.5),
			background-color 0.5s cubic-bezier(0.2, 0.9, 0.3, 1.5);
		&:hover {
			box-shadow: 0px 0px 55px 35px rgba(0, 0, 0, 0.04);
		}
		/* @media screen and (max-width: 1500px) {
			width: fit-content;
		}
		@media screen and (max-width: 1000px) {
			width: 125px;
		} */
	}
	.container * {
		padding: 0;
		margin: 0;
	}
	.title {
		width: 100%;
		font-size: 26px;
		font-family: CooperHewitt-Bold;
	}
	.readMore {
		all: unset;
		font-family: CooperHewitt-Bold;
		cursor: pointer;
	}
	.topContainer {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
	}
	.bottomContainer {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.body {
		padding: 25px 0px;
		width: 100%;
		overflow: hidden;
		white-space: normal;
		text-wrap: wrap;
	}
</style>
