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

  * :global(.card) {
    border-radius: 0.25rem;
    border-width: 1px;
    border: 1px solid #e2e8f0;
    margin-bottom: 3rem;
    padding: 2rem;
    background: white;
  }

  * :global(.shadow) {
    box-shadow: 0px 5px 20px 5px rgba(0, 0, 0, 0.075);
  }
</style>

<!-- Reset files doesn't inherit the parent scope.
This ensures that the example app doesn't inherit
 layouts from the main app. -->
<div class="example">
  <NavLinks />
  <slot>
    <!-- optional fallback -->
  </slot>
</div>
