<script>
  import { url } from "@sveltech/routify";
  import { fakeapi } from "../../_fakeapi";
  export let slug;
</script>

<style>
  .card {
  }
</style>

{#await fakeapi(slug)}
  Loading page...
{:then song}
  <div class="card" style="width: 512px; margin: auto">
    <h3>{song.title}</h3>
    <h5>{song.artist}</h5>
    <iframe width="420" height="315" src={song.url} allowfullscreen />
  </div>
  <!-- promise was fulfilled -->
{/await}
