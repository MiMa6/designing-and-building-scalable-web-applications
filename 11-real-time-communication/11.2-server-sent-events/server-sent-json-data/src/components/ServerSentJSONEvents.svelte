<script>
	import { onMount } from 'svelte';

	let events = [];
	let eventSource;

	onMount(() => {
		//eventSource = new EventSource('http://localhost:7777');
		eventSource = new EventSource('/api/json-sse');
		eventSource.onmessage = (event) => {
			events = [...events, JSON.parse(event.data)];
		};

		eventSource.onerror = (event) => {
			console.log('error: ' + event);
		};

		return () => {
			if (eventSource.readyState === 1) {
				eventSource.close();
			}
		};
	});

	const closeEventStream = () => {
		eventSource.close();
	};
</script>

<h2>Server-sent events ({events.length})</h2>

<button on:click={closeEventStream}>Close connection</button>

<ul>
	{#each events as event}
		<li>{event.user}: {event.message}</li>
	{/each}
</ul>
