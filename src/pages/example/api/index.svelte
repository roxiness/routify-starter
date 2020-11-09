<script>
  import { url, prefetch } from "@roxi/routify";
  export let scoped;
  const options = {
    validFor: 3600 * 24 * 31, // don't refresh assets on the page for a month
    writeHeaders: true // useful for debugging
  };
  const { movies } = scoped;
  // console.log(movies)
</script>

<div style="text-align: center">
  {#each movies as [showId, title]}
    <h3>
      <a use:prefetch={options} href={$url('./:showId', { showId })}>
        {title}
      </a>
    </h3>
  {/each}
</div>
