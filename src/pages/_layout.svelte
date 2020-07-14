<script>
  import { layout, url, isActive } from "@sveltech/routify";
</script>

<style>
  a {
    text-transform: uppercase;
    padding: 0 16px;
  }
  a.active {
    font-weight: bold;
  }
  .container {
    max-width: 800px;
    margin: auto;
  }
</style>

<div class="container">
  <nav>
    {#each $layout.parent.children as node}
      <a href={$url(node.path)} class:active={$isActive(node.path)}>{node.title}</a>
    {/each}
  </nav>

  <slot />
</div>
