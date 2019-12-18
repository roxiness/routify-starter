<!-- Reset files doesn't inherit the parent scope.
This ensures that the example app doesn't inherit
 layouts from the main app. -->

<script>
  import { url } from "@sveltech/routify";
  import NavLinks from "./_components/NavLinks.svelte";
</script>

<style>
  .example {
    background-color: #faaca8;
    background-image: linear-gradient(19deg, #faaca8 0%, #ddd6f3 100%);
    background-attachment: fixed;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
</style>



<div class="example">
  <NavLinks />
  <slot>
    <!-- optional fallback -->
  </slot>
</div>
