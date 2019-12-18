<script>
  import { getContext, onDestroy, onMount } from "svelte";
  import { goto, url } from "@sveltech/routify";
  export let key, scoped;
  const { send, receive, fade } = scoped;

</script>


<div class="container" on:click={() => $goto('../')} transition:fade|local>
  <div class="modal" in:receive|local={{ key: 'modal' }} out:send|local={{ key: 'modal' }}>
    {key}
  </div>
</div>
