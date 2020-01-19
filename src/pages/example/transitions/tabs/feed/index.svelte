<script>
  import { url } from "@sveltech/routify";
</script>

<h1>Feed</h1>

{#each new Array(10) as item, id}
  <a class="card" href={$url('../:id', { id })}>
    <h3 class="item">{id}</h3>
  </a>
{/each}
