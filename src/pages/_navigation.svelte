<script>
  import { layout, url, isActive } from "@sveltech/routify";
</script>

<nav class="header">
  {#each $layout.parent.children as node}
    <a href={$url(node.path)} class:active={$isActive(node.path)}>{node.title}</a>
  {/each}
</nav>
