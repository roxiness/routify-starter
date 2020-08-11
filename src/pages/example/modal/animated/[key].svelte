<script>
  import { goto, params, context } from "@roxi/routify";
  export let scoped
  const { send, receive, activeKey, key } = scoped;
</script>

<div class="container" on:click={() => $goto('./')} >
  <div
    class="modal"
    in:receive|local={{ key: 'modal' }}
    out:send|local={{ key: 'modal' }}>
    {scoped.key}
  </div>
</div>
