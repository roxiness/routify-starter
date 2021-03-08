<script>
  import { goto } from "@roxi/routify";
  export let scoped
  $: ({ send, receive, key } = scoped);
</script>

<div class="container" on:click={() => $goto('./')} >
  <div
    class="modal"
    in:receive|local={{ key: 'modal' }}
    out:send|local={{ key: 'modal' }}>
    {key}
  </div>
</div>
