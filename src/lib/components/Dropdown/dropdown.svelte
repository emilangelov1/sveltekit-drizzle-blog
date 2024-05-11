<script lang="ts">
	import { ArrowRight } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { cubicInOut } from 'svelte/easing';
	import { tweened } from 'svelte/motion';

	export let actionSlug: string;

	let dropDownVisible: boolean = false;
	const rotation = tweened(0, {
		duration: 350,
		easing: cubicInOut
	});
	const height = tweened(0, {
		duration: 350,
		easing: cubicInOut
	});
	const opacity = tweened(0, {
		duration: 200,
		easing: cubicInOut
	});
	const clickOutsideHandler = <T extends Event>(event: T) => {
		const filterButton = document.getElementById('filterButton');
		const filter = document.getElementById('filter');

		if (!filterButton?.contains(event.target as Node) && !filter?.contains(event.target as Node)) {
			dropDownVisible = false;
			rotation.set(0);
			height.set(0);
			setTimeout(() => {
				opacity.set(dropDownVisible ? 1 : 0);
			}, 150);
		}
	};
	onMount(() => {
		document.addEventListener('click', clickOutsideHandler);
		() => {
			return () => {
				document.removeEventListener('click', clickOutsideHandler);
			};
		};
	});
</script>

<div class="filterContainer">
	<button
		class="filter"
		type="button"
		id="filterButton"
		on:click={() => {
			(dropDownVisible = !dropDownVisible), rotation.set(dropDownVisible ? 90 : 0);
			height.set(dropDownVisible ? 250 : 0);
			if (dropDownVisible) {
				opacity.set(dropDownVisible ? 1 : 0);
			}
			if (!dropDownVisible) {
				setTimeout(() => {
					opacity.set(dropDownVisible ? 1 : 0);
				}, 150);
			}
		}}
		>Filter <ArrowRight style="transform: rotate({$rotation}deg)" />
	</button>
	<form
		id="filter"
		method="GET"
		action={actionSlug}
		class="dropdown"
		style="height: {$height}px; opacity: {$opacity};"
	>
		<div class="checkboxes">
			<slot />
		</div>
		<input type="submit" value="Search" class="searchButton" />
	</form>
</div>

<style>
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
	.searchButton {
		all: unset;
		background-color: #b62f2f;
		border-radius: 2px;
		width: 65px;
		height: 35px;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
		font-family: CooperHewitt-Medium;
		overflow: hidden;
		color: #f9f9f9;
		font-size: 12px;
		transition: 0.5s all cubic-bezier(0.2, 0.9, 0.3, 1);
		margin: 15px;
		&:hover {
			background-color: #972f2f;
		}
	}
	.dropdown {
		opacity: 0;
		background-color: #f9f9f9;
		box-shadow: 0px 0px 20px 10px rgba(0, 0, 0, 0.05);
		position: absolute;
		z-index: 1;
		width: 200px;
		top: 50px;
		right: 0;
		border-radius: 10px;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-start;
	}
	.checkboxes {
		margin: 15px;
		display: flex;
		flex-direction: column;
		gap: 15px;
	}
</style>
