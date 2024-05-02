<script lang="ts">
	import { enhance } from '$app/forms';

	export let register: boolean;
</script>

<div class="cardContainer">
	<p class="title">{register ? 'Register' : 'Login'}</p>
	<form method="POST" use:enhance action={register ? '?/register' : '?/login'} style="width: 100%;">
		<div class="inputContainer">
			<label class="label" for="email">Email</label>
			<input required class="input" type="email" id="email" name="email" />
		</div>
		{#if register}
			<div class="inputContainer">
				<label class="label" for="username">Username</label>
				<input required class="input" type="text" id="username" name="username" />
			</div>
		{/if}
		<div class="inputContainer">
			<label class="label" for="password">Password</label>
			<input required class="input" type="password" id="password" name="password" />
		</div>
		{#if register}
			<div class="footer">
				<button type="button" class="register">Login</button>
				<button type="submit" class="login">Register</button>
			</div>
		{/if}
		{#if !register}
			<div class="footer">
				<button class="register">Register</button>
				<button class="login">Login</button>
			</div>
		{/if}
	</form>
</div>

<style>
	.title {
		font-size: 26px;
		font-family: 'CooperHewitt-Bold';
		font-weight: bold;
		font-style: normal;
	}
	.label {
		font-size: 14px;
		font-family: 'CooperHewitt-Medium';
		font-style: normal;
		font-weight: normal;
	}
	.cardContainer {
		background-color: white;
		width: 40%;
		padding: 50px;
		height: fit-content;
		border-radius: 10px;
		box-shadow: 0px 0px 150px 80px rgba(0, 0, 0, 0.04);
		/* padding: 100px; */
		display: flex;
		justify-content: flex-start;
		align-items: flex-start;
		flex-direction: column;
		gap: 25px;
	}
	.inputContainer {
		width: 100%;
	}
	.input {
		all: unset;
		display: flex;
		align-items: center;
		width: 100%;
		text-wrap: wrap;
		height: 35px;
		border: 1.5px solid #b62f2f;
		border-radius: 3px;
		transition: box-shadow 0.5s cubic-bezier(0.2, 0.9, 0.3, 1.5);
		&:focus {
			border: 2px solid #b62f2f;
			box-shadow: 0px 0px 20px 10px rgba(0, 0, 0, 0.05);
		}
	}
	.footer {
		display: flex;
		align-items: flex-end;
		justify-content: flex-end;
		width: 100%;
		gap: 25px;
	}
	.login {
		all: unset;
		background-color: #b62f2f;
		border-radius: 2px;
		width: 65px;
		height: 35px;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
		font-family: 'CooperHewitt-Medium';
		font-style: normal;
		font-weight: normal;
		color: white;
		font-size: 12px;
	}
	.register {
		all: unset;
		border: 1px solid #b62f2f;
		border-radius: 2px;
		width: 65px;
		height: 35px;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
		font-style: normal;
		font-weight: normal;
		font-family: 'CooperHewitt-Medium';
		color: #b62f2f;
		font-size: 12px;
	}
</style>
