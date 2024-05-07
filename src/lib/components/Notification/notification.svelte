<script lang="ts">
	import { Check, X } from 'lucide-svelte';
	import { onDestroy } from 'svelte';
	import { cubicInOut } from 'svelte/easing';
	import { tweened } from 'svelte/motion';

	export let message: string | undefined;
	export let type: 'error' | 'success';
	export let top: number | undefined;

	let progress = tweened(0, { duration: 3000, easing: cubicInOut });

	let width = tweened(0, { duration: 250, easing: cubicInOut });

	$: if (message) progress.set(100), width.set(300);

	let progressValue: number;
	const unsubscribeProgress = progress.subscribe((value) => {
		progressValue = value;
	});
	let widthValue: number;
	const unsubscribeWidth = width.subscribe((value) => {
		widthValue = value;
	});

	$: if (progressValue === 100) {
		width.set(0);
		width.subscribe((value) => {
			widthValue = value;
		});
		setTimeout(() => progress.set(0), 2000);
	}
	onDestroy(unsubscribeProgress);
	onDestroy(unsubscribeWidth);
</script>

<div
	id="notification"
	class="container"
	style={`width: ${widthValue !== 300 ? widthValue + 'px' : 'fit-content'}; top: ${top ? String(top + 30) + 'px' : '30px'}`}
>
	<div class="topContainer">
		<p class="message">
			{message}
		</p>
		{#if type === 'error'}
			<X style="padding: 0px 10px;" color="#b62f2f" size="25" />
		{/if}
		{#if type === 'success'}
			<Check style="padding: 0px 10px;" color="green" size="25" />
		{/if}
	</div>
	<div
		class="timer"
		style={`${type === 'error' ? 'background-color: #b62f2f' : 'background-color: green'}
				; width: ${progressValue}%; ${progressValue === 100 ? 'border-top-right-radius: 0px;' : ''};`}
	/>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		padding: 0;
		margin: 0;
		height: 45px;
		border-radius: 5px;
		background-color: white;
		box-shadow: 0px 0px 100px 30px rgba(0, 0, 0, 0.04);
		position: absolute;
		left: 50%;
		transform: translate(-50%, 0%);
		transition: 0.5s all cubic-bezier(0.2, 0.9, 0.3, 1);
	}
	.topContainer {
		display: flex;
		flex-direction: row;
		height: 100%;
		justify-content: space-around;
		align-items: center;
		width: 100%;
	}
	.message {
		font-size: 18px;
		padding: 0;
		margin: 0;
		text-overflow: clip;
		white-space: nowrap;
		overflow: hidden;
		padding-left: 10px;
	}
	.timer {
		height: 5px;
		border-top-right-radius: 5px;
		border-bottom-right-radius: 5px;
		border-bottom-left-radius: 5px;
	}
</style>
