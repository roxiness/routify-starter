<script>
  import { goto, url } from "@roxi/routify";
  export let key

</script>

<div class="container" on:click={() => $goto('./')} >
  <div class="modal" >
    {key}
  </div>
</div>
