<script lang="ts">
	let innerHeight = 0;
	$: headerStyles =
		innerHeight == 0
			? 'box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0)'
			: 'box-shadow: 0px 00px 100px -30px rgba(0, 0, 0, 0.2); backdrop-filter: blur(5px);  background-color: rgba(255, 255, 255, 0.75);';
</script>

<svelte:window bind:scrollY={innerHeight} />

<div class="header" style={headerStyles}>
	<div class="container">
		<p class="headerText">Header</p>
	</div>
</div>

<style>
	.header {
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
		font-family: 'CooperHewitt-Medium';
		font-style: normal;
		font-weight: 600;
		font-size: 34px;
		line-height: 72px;
		color: black;
	}
	.container {
		width: 60%;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
</style>
