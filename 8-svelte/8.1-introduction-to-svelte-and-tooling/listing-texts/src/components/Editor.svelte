<script>
	export let addText;

	let text = '';

	const textTyped = () => {
		if (text.length === 0) {
			return;
		}
		addText(text);
		text = '';
	};
</script>

<section>
	<p>Write something</p>
	<input type="text" bind:value={text} />
	<button on:click={textTyped}>Add text</button>
</section>

<style>
	section {
		padding: 0.5rem;
		margin: 0.5rem;
		font-family: 'Comic Sans MS';
	}
</style>
