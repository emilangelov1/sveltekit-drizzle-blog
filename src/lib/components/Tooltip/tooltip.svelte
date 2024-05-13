<script>
	export let text = '';
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
{#if text !== ''}
	<div class="tooltip">
		<slot />
		<div class="tooltipText">{text}</div>
		<div class="tooltipTail" />
	</div>
{/if}
{#if text === ''}
	<slot />
{/if}

<style>
	.tooltip {
		position: relative;
		display: inline-block;
	}
	.tooltipText {
		font-family: CooperHewitt-Medium, sans-serif;
	}
	.tooltip .tooltipText {
		visibility: hidden;
		background-color: #333;
		min-width: 100px;
		width: fit-content;
		color: #fff;
		text-align: center;
		padding: 5px;
		border-radius: 6px;
		position: absolute;
		z-index: 1;
		bottom: 150%;
		left: 50%;
		margin-left: -75px;
		opacity: 0;
		transition: opacity 0.3s cubic-bezier(0.2, 0.9, 0.3, 1);
	}

	.tooltip:hover .tooltipText {
		visibility: visible;
		opacity: 1;
		box-shadow: 0px 0px 35px 20px rgba(0, 0, 0, 0.1);
	}
	.tooltip:hover .tooltipTail {
		visibility: visible;
		opacity: 1;
	}
	.tooltipTail {
		position: absolute;
		opacity: 0;
		visibility: hidden;
		width: 0;
		height: 0;
		border-left: 8px solid transparent;
		border-right: 8px solid transparent;
		border-top: 8px solid #333;
		bottom: 130%;
		left: 50%;
		transform: translateX(-50%);
		transition: opacity 0.3s cubic-bezier(0.2, 0.9, 0.3, 1);
	}
</style>
