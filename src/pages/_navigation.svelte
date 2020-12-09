<script>
  import { layout, url, isActive } from "@roxi/routify";
</script>

<nav class="header">
  {#each $layout.children as {path, title}}
    <a href={$url(path)} class:active={$isActive(path)}>{title}</a>
  {/each}
</nav>
