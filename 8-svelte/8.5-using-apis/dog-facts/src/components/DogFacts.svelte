<script>
	const fetchFact = async () => {
		const response = await fetch(' https://dogapi.dog/api/v2/facts');
    return await response.json();
	};

	let factPromise = '';
	const updateFact = () => {
		fetchFact()
      .then((response) => factPromise = response.data[0].attributes.body)
	};

</script>

<button on:click={updateFact}> Fetch a dog fact</button>

{#await factPromise}
  <p>Loading...</p>
{:then fact}
<p>{fact}</p>
{/await}
