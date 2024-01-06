<script>
	import Editor from './Editor.svelte';
	let texts = [];

	const addText = (text) => {
		if (texts.includes(text)) {
			console.log(`"${text}" already in list`);
		} else {
			console.log(`"${text}" added in list`);
			texts = [...texts, text];
		}
	};
</script>

<Editor {addText} />

<ul>
	{#each texts as text}
		<li>{text}</li>
	{/each}
</ul>
