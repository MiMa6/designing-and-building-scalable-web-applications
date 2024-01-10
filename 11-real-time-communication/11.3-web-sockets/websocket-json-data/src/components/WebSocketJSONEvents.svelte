<script>
	import { onMount } from 'svelte';
	let input = '';

	let messages = [];
	let ws;

	onMount(() => {
		const host = window.location.hostname;
		ws = new WebSocket('ws://' + host + ':7777/api/json-ws');
		//ws = new WebSocket('ws://' + host + ':7777');

		ws.onmessage = (event) => {
			const data = JSON.parse(event.data);
			messages = [...messages, data];
		};

		return () => {
			if (ws.readyState === 1) {
				ws.close();
			}
		};
	});

	const sendMessage = () => {
		if (input.trim() == '') {
			return;
		}

		ws.send(input.trim());
		input = '';
	};
</script>

<h2>Messages</h2>

<input bind:value={input} />
<button on:click={sendMessage}>Send message</button>

<ul>
	{#each messages as message}
		<li>{message.user}: {message.message}</li>
	{/each}
</ul>
