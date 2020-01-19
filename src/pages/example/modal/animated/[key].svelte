<script>
  import { goto, params } from "@sveltech/routify";
  export let key, scoped;
  const { send, receive, fade, activeKey } = scoped;
  $: $activeKey = $params.key;
</script>

<div class="container" on:click={() => $goto('../')} transition:fade|local>
  <div
    class="modal"
    in:receive|local={{ key: 'modal' }}
    out:send|local={{ key: 'modal' }}>
    {key}
  </div>
</div>
