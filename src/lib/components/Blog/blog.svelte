<script>
	export let title = '';
	export let body = '';
	export let authorId = undefined;
</script>

<div class="container">
	<p class="title">{title}</p>
	<p class="body">{body}</p>
</div>

<style>
	.container {
		padding: 25px 50px;
		background-color: white;
		width: 50%;
		height: 50%;
		border-radius: 10px;
		box-shadow: 0px 0px 100px 80px rgba(0, 0, 0, 0.02);
	}
	.title {
		font-size: 30px;
		font-family: 'CooperHewitt-Bold';
	}
	.body {
		font-size: 18px;
	}
</style>
