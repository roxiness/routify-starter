<script>
  import { url } from "@roxi/routify";
  export let data = [],
    id;
  $: item = data.filter(item => item.id == id)[0];
</script>

{#if item}
  <div>
    <div>
      {#each Object.entries(item) as [name, value]}
        <div>
          <b>{name}:</b>
          {value}
        </div>
      {/each}
    </div>
    <br />
    <a href={$url('../', { id })}>[Back]</a>
    <a href={$url('../:id/update', { id })}>[Update]</a>
  </div>
{/if}
