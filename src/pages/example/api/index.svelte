<script>
  import { url } from "@sveltech/routify";
  import { fakeapi } from "../_fakeapi";
</script>

<style>
  .card {
    display: block;
    cursor: pointer;
  }
</style>

<div style="width: 512px; margin: auto; overflow: auto">
  {#await fakeapi()}
    Loading page...
  {:then songs}
    <ul>
      {#each songs as { title, slug }}
        <a
          href={$url('../:slug', { slug })}
          class="card"
          style="text-align:center">
          {title}
        </a>
      {/each}
    </ul>
  {/await}
</div>
