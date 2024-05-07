<script lang="ts">
	import { theme } from '$lib/stores/themes';
	import { ArrowLeft } from 'lucide-svelte';

	let innerHeight = 0;
	$: headerStyles =
		innerHeight == 0
			? 'box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0)'
			: 'box-shadow: 0px 00px 100px -15px rgba(0, 0, 0, 0.2); backdrop-filter: blur(5px);  background-color: rgba(255, 255, 255, 0.75);';
</script>

<svelte:window bind:scrollY={innerHeight} />

<div class="header" style={headerStyles}>
	<div class="container">
		<button on:click={() => (history ? history.back() : null)} class="back">
			<ArrowLeft />
		</button>
		<a href="/" class="headerText">Header</a>
		<a style="color: {theme.accent}" class="createBlog" href="/createBlog">Create Blog</a>
	</div>
</div>

<style>
	.header {
		view-transition-name: header;
		z-index: 100;
		position: fixed;
		height: 75px;
		width: 100%;
		background-color: white;
		transition: 0.5s all cubic-bezier(0.2, 0.9, 0.3, 1);
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.headerText {
		all: unset;
		cursor: pointer;
		font-family: CooperHewitt-Medium;
		font-size: 34px;
		line-height: 72px;
		color: black;
	}
	.container {
		width: 65%;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.createBlog {
		font-size: 16px;
		all: unset;
		font-family: CooperHewitt-Bold;
		cursor: pointer;
	}
	.back {
		all: unset;
		cursor: pointer;
	}
</style>
