<script lang="ts">
	import { enhance } from '$app/forms';
	import { Eye, EyeOff } from 'lucide-svelte';

	export let register: boolean;
	let showPassword: boolean = false;
</script>

<div class="cardContainer">
	<p class="title">{register ? 'Register' : 'Login'}</p>
	<form
		method="POST"
		class="form"
		use:enhance
		action={register ? '?/register' : '?/login'}
		style="width: 100%;"
	>
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
			<input
				required
				class="input"
				type={showPassword ? 'text' : 'password'}
				id="password"
				name="password"
			/>
			<button type="button" on:click={() => (showPassword = !showPassword)} class="showPassword">
				{#if showPassword}
					<Eye size={19} />
				{/if}
				{#if !showPassword}
					<EyeOff size={19} />
				{/if}
			</button>
		</div>
		{#if register}
			<div class="footer">
				<p class="register">Already registered? <a class="redirect" href="/login">Login</a></p>
				<button type="submit" class="login">Register</button>
			</div>
		{/if}
		{#if !register}
			<div class="footer">
				<p class="register">
					Don't have an account? <a class="redirect" href="/register">Register</a>
				</p>
				<button class="login">Login</button>
			</div>
		{/if}
	</form>
</div>

<style>
	.title {
		font-size: 26px;
		font-family: CooperHewitt-Bold;
		height: 100%;
		width: 100%;
		padding: 0;
		margin: 0;
	}
	.form {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		gap: 15px;
	}
	.label {
		font-size: 14px;
		font-family: CooperHewitt-Medium;
	}
	.cardContainer {
		view-transition-name: login;
		background-color: #f9f9f9;
		width: 40%;
		padding: 50px;
		height: fit-content;
		border-radius: 10px;
		box-shadow: 0px 0px 150px 90px rgba(0, 0, 0, 0.05);
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
		padding-left: 15px;
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
		align-items: center;
		justify-content: flex-end;
		width: 100%;
		gap: 25px;
		padding-top: 20px;
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
		font-family: CooperHewitt-Medium;
		color: #f9f9f9;
		font-size: 12px;
		transition: 0.5s all cubic-bezier(0.2, 0.9, 0.3, 1);
		&:hover {
			background-color: #972f2f;
		}
	}
	.register {
		& a {
			all: unset;
			cursor: pointer;
			color: #b62f2f;
			font-family: CooperHewitt-Bold;
		}
	}
	.redirect {
		font-family: CooperHewitt-Bold;
	}
	.showPassword {
		display: flex;
		justify-content: center;
		align-items: center;
		align-self: center;
		padding: 0;
		margin: 0;
		all: unset;
		cursor: pointer;
		position: relative;
		top: -29px;
		left: 95%;
	}
</style>
