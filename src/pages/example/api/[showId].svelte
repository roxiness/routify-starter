<script>
  import { ready, url, params } from "@roxi/routify";
  let series = {};

  $: updateShow($params.showId);

  function updateShow(id) {
    fetch(`https://api.tvmaze.com/shows/${id}`)
      .then(response => response.json())
      .then(json => {
        series = json;
        $ready();
      });
  }
</script>

<div style="text-align: center; max-width: 540px; margin: auto">
  <h4>
    <a href={$url('./')}>Go back</a>
  </h4>

  {#if series.id}
    <img src={series.image.medium.replace('http', 'https')} alt="cover" style="height: 295px" />
    <h1>{series.name} ({series.premiered.split('-')[0]})</h1>
    <p>
      {@html series.summary}
    </p>
    <a href={series.url}>Read more on TVMaze</a>
  {/if}
</div>
