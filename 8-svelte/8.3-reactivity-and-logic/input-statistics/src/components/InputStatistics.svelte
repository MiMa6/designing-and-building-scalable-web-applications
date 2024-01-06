<script>
	let numbers = [];
	let number;
	let sum = numbers.reduce((total, curr) => total + curr, 0);
	let totalNumbers = numbers.length;
	let avg = sum / totalNumbers;

	const addNumber = () => {
		numbers = [...numbers, number];
		console.log(numbers);
		number = '';
	};

	$: sum = numbers.reduce((total, curr) => total + curr, 0);
	$: totalNumbers = numbers.length;
	$: avg = sum / totalNumbers;
</script>

<h1>Statistics generator</h1>

<input type="number" bind:value={number} />
<button on:click={addNumber}>Add value</button>

<h2>Statistics</h2>

<p>Sum: {sum}</p>
<p>Total numbers: {totalNumbers}</p>
<p>Average: {avg}</p>

<h2>Numbers entered so far</h2>

<ul>
	{#each numbers as nmb}
		<li>{nmb}</li>
	{/each}
</ul>
