<script>
  let message = "Svelte";

  const updateText = () => {
    message === "Svelte" ? (message = "Astro") : (message = "Svelte");
  };
</script>

<h1>Hello {message}!</h1>
<button on:click={updateText}>Update!</button>
