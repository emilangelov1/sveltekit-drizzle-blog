<script lang="ts">
	import { enhance } from '$app/forms';
	import { cubicInOut } from 'svelte/easing';
	import { tweened } from 'svelte/motion';

	export let isOpen: boolean;
	export let title: string;
	export let body: string;
	export let actionSlug: string;
	export let modalSize: 'small' | 'large';

	let size = tweened(0, { duration: 300, easing: cubicInOut });

	$: size.set(isOpen ? 1 : 0);
</script>

{#if isOpen}
	<div class="modal" style="opacity: {$size}">
		<div
			class="modalContent"
			style="transform: scale({$size}); {modalSize === 'large'
				? 'width: 50%; max-width: 550px; max-height: 400px; height: 35%;'
				: 'width: 30%; max-width: 550px; max-height: 400px; height: 20%;'}"
		>
			<div class="topContainer">
				<p>{title}</p>
				<button class="close" on:click={() => (isOpen = false)}>&times;</button>
			</div>
			<p class="body">{body}</p>
			<div class="footer">
				<button on:click={() => (isOpen = false)} class="cancel">Cancel</button>
				<form use:enhance method="POST" action={actionSlug}>
					<button type="submit" class="continue">Continue</button>
				</form>
			</div>
		</div>
	</div>
{/if}

<style>
	.modal {
		display: flex;
		justify-content: center;
		align-items: center;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.2);
		z-index: 999;
	}

	.modalContent {
		background-color: white;
		padding: 20px;
		border-radius: 10px;
		box-shadow: 0px 0px 100px 10px rgba(0, 0, 0, 0.05);
		text-align: center;
		display: flex;
		flex-direction: column;
		min-height: 200px;
		min-width: 200px;
	}
	.body {
		display: flex;
		height: 100%;
	}
	.topContainer {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid grey;
	}

	.close {
		all: unset;
		color: #b62f2f;
		font-size: 28px;
		font-weight: bold;
		cursor: pointer;
		transition: 0.3s all ease-in-out;
	}

	.close:hover,
	.close:focus {
		color: #972f2f;
		text-decoration: none;
		cursor: pointer;
	}
	.footer {
		display: flex;
		flex-direction: row;
		align-items: flex-end;
		justify-content: flex-end;
		gap: 25px;
		flex: 1;
	}
	.cancel {
		all: unset;
		border: 1px solid #b62f2f;
		color: #b62f2f;
		border-radius: 2px;
		width: 65px;
		height: 35px;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
		font-family: CooperHewitt-Medium;
		font-size: 12px;
		&:hover {
			border-color: #972f2f;
			color: #972f2f;
		}
	}
	.continue {
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
		color: #f9f9f9;
		font-size: 12px;
		transition: 0.5s all cubic-bezier(0.2, 0.9, 0.3, 1);
		&:hover {
			background-color: #972f2f;
		}
	}
</style>
