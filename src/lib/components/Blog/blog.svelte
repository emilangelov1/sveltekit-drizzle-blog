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
		background-color: white;
		width: 50%;
		height: 50%;
		border-radius: 5px;
		box-shadow: 0px 0px 30px -12px rgba(0, 0, 0, 0.2);
	}
	.title {
		font-size: 22px;
	}
	.body {
		font-size: 16px;
	}
</style>
