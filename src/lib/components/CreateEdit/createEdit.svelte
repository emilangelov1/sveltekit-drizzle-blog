<script lang="ts">
	import Blog from '$lib/components/Blog/blog.svelte';
	import { AlignCenter, AlignLeft, AlignRight } from 'lucide-svelte';
	import { enhance } from '$app/forms';
	import Tooltip from '../Tooltip/tooltip.svelte';

	export let title = {
		content: '',
		style: ['']
	};
	export let body = {
		content: '',
		style: ['']
	};
	function placeHolder(type: 'title' | 'body') {
		return {
			content: type === 'title' ? 'Title' : 'Body',
			style:
				type === 'title'
					? JSON.parse(styleMapValue).titleStyle
					: JSON.parse(styleMapValue).bodyStyle
		};
	}
	function findExistingStyle(input: string, style: Array<string>, propertyName: string) {
		const index = style.findIndex((e) => e.includes(propertyName));
		if (index === -1) {
			style.push(`${propertyName}: ${input}`);
		} else {
			style[index] = `${propertyName}: ${input}`;
		}
	}
	$: styleMapValue = JSON.stringify({
		titleStyle: title.style.join('; '),
		bodyStyle: body.style.join('; ')
	});
	function onHandleChange(
		event: Event & { currentTarget: (EventTarget & HTMLInputElement) | HTMLTextAreaElement }
	) {
		return event.currentTarget.value;
	}
</script>

<div class="container">
	<div class="blogContainer">
		<Blog
			create
			body={body.content
				? { content: body.content, style: JSON.parse(styleMapValue).bodyStyle }
				: placeHolder('body')}
			title={title.content
				? { content: title.content, style: JSON.parse(styleMapValue).titleStyle }
				: placeHolder('title')}
		/>
	</div>
	<form use:enhance action="?/createBlog" method="POST" class="form">
		<div class="labelContainer">
			<label for="title">Title:</label>
			<input
				class="input"
				type="text"
				id="title"
				name="title"
				value={title.content ?? title.content}
				on:input={(event) => (title.content = onHandleChange(event))}
			/>
		</div>
		<div class="flexContainer">
			<Tooltip text="Align Left">
				<button
					type="button"
					class="flexButton"
					id="alignLeft"
					name="alignLeft"
					on:click={() => {
						findExistingStyle('left', title.style, 'text-align');
						title.style = title.style;
					}}><AlignLeft /></button
				>
			</Tooltip>
			<Tooltip text="Align Center">
				<button
					type="button"
					class="flexButton"
					id="alignCenter"
					name="alignCenter"
					on:click={() => {
						findExistingStyle('center', title.style, 'text-align');
						title.style = title.style;
					}}><AlignCenter /></button
				>
			</Tooltip>
			<Tooltip text="Align Right">
				<button
					type="button"
					class="flexButton"
					id="alignRight"
					name="alignRight"
					on:click={() => {
						findExistingStyle('right', title.style, 'text-align');
						title.style = title.style;
					}}><AlignRight /></button
				>
			</Tooltip>
			<Tooltip text="Change color">
				<input
					type="color"
					class="colorInput"
					name="color"
					id="color"
					on:input={(event) => {
						findExistingStyle(event.currentTarget?.value, title.style, 'color');
						title.style = title.style;
					}}
				/>
			</Tooltip>
		</div>
		<div class="labelContainer">
			<label for="body">Body:</label>
			<textarea
				style="height: 250px"
				wrap="hard"
				class="inputText"
				id="body"
				name="body"
				value={body.content ?? body.content}
				on:input={(event) => (body.content = onHandleChange(event))}
			/>
			<div class="flexContainer">
				<Tooltip text="Align Left">
					<button
						type="button"
						class="flexButton"
						id="alignLeft"
						name="alignLeft"
						on:click={() => {
							findExistingStyle('left', body.style, 'text-align');
							body.style = body.style;
						}}><AlignLeft /></button
					>
				</Tooltip>
				<Tooltip text="Align Center">
					<button
						type="button"
						class="flexButton"
						id="alignCenter"
						name="alignCenter"
						on:click={() => {
							findExistingStyle('center', body.style, 'text-align');
							body.style = body.style;
						}}><AlignCenter /></button
					>
				</Tooltip>
				<Tooltip text="Align Right">
					<button
						type="button"
						class="flexButton"
						id="alignRight"
						name="alignRight"
						on:click={() => {
							findExistingStyle('right', body.style, 'text-align');
							body.style = body.style;
						}}><AlignRight /></button
					>
				</Tooltip>

				<Tooltip text="Change color">
					<input
						type="color"
						class="colorInput"
						on:input={(event) => {
							findExistingStyle(event.currentTarget?.value, body.style, 'color');
							body.style = body.style;
						}}
					/>
				</Tooltip>
			</div>
		</div>
		<textarea hidden id="styleMap" name="styleMap" bind:value={styleMapValue} />

		<button type="submit" value="Submit" class="submit">Submit</button>
	</form>
</div>

<style>
	.container {
		display: flex;
		flex-direction: row;
		width: 65%;
		gap: 50px;
	}
	.blogContainer {
		display: flex;
		max-width: 60%;
		flex: 2;
	}
	.submit {
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
	.form {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
		height: 100%;
		flex: 1;
		gap: 45px;
	}
	.flexContainer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
	}
	.flexButton {
		all: unset;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 5px;
		border-radius: 5px;
		cursor: pointer;
		transition: all 0.5s cubic-bezier(0.2, 0.9, 0.3, 1.5);
		box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.08);
		&:hover {
			box-shadow: 0px 0px 25px 5px rgba(0, 0, 0, 0.08);
			scale: 1.05;
		}
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
	.inputText {
		all: unset;
		display: flex;
		align-items: center;
		width: 100%;
		overflow: auto;
		white-space: pre-wrap;
		word-wrap: break-word;
		height: 35px;
		border: 1.5px solid #b62f2f;
		border-radius: 3px;
		transition: box-shadow 0.5s cubic-bezier(0.2, 0.9, 0.3, 1.5);
		&:focus {
			border: 2px solid #b62f2f;
			box-shadow: 0px 0px 20px 10px rgba(0, 0, 0, 0.05);
		}
	}
	.labelContainer {
		width: 100%;
	}
	.colorInput {
		all: unset;
		color: buttontext;
		width: 40px;
		height: 40px;
		cursor: pointer;
	}
</style>
