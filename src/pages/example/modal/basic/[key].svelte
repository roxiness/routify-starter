<script>
  import { goto, url } from "@sveltech/routify";
  export let key, scoped
  console.log( 'url',  $url('../') )

</script>

<div class="container" on:click={() => $goto('../')} >
  <div class="modal" >
    {key}
  </div>
</div>
