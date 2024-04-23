<script lang="ts">
	import Star from 'lucide-svelte/icons/star';
	import { theme } from '$lib/stores/themes';
	export let title = '';
	export let stars = 0;
	export let author = {
		name: '',
		id: 0
	};
	export let starred = false;
	let hovered = false;
	export let body = '';
	export let height = 'fit-content';
	const randomNumberBetween = (min: number, max: number) => {
		return Math.floor(Math.random() * (max - min + 1) + min);
	};
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	on:mouseenter={() => (hovered = true)}
	on:mouseleave={() => (hovered = false)}
	class="container"
	style="height: {height}"
>
	<div class="topContainer">
		<p class="title">{title}</p>
		{#if hovered}
			<button on:click={() => (starred = !starred)} class="starContainer">
				<Star color={starred ? 'red' : 'black'} />
				<p>{stars}</p>
			</button>
		{/if}
	</div>
	<p class="body">{body.slice(0, randomNumberBetween(50, 500))}...</p>
	<div class="bottomContainer">
		<p class="author">{author.name}</p>
		<button style="color: {theme.accent}" class="readMore">Read More</button>
	</div>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 15px 35px;
		background-color: white;
		width: 300px;
		border-radius: 30px;
		box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.06);
		transition: all 0.5s cubic-bezier(0.2, 0.9, 0.3, 1.5);
		&:hover {
			box-shadow: 0px 0px 50px 30px rgba(0, 0, 0, 0.03);
		}
	}
	.container * {
		padding: 0;
		margin: 0;
	}
	.title {
		font-size: 26px;
		font-family: CooperHewitt-Bold;
	}
	.author {
		font-family: CooperHewitt-Bold;
	}
	.readMore {
		all: unset;
		font-family: CooperHewitt-Bold;
		cursor: pointer;
		font-weight: bold;
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
	.starContainer {
		all: unset;
		cursor: pointer;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 10px;
		height: 100%;
	}
	.body {
		padding: 25px 0px;
	}
</style>
