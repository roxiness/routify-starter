<script>
  import { fade } from "svelte/transition";

  let show = true;
  let render = window.__preRendered ? "prerender" : window.__ssrRendered ? "ssr" : "spa";
  setTimeout(() => {
    show = false;
  }, 3000);
</script>

<style>
  .box {
    position: fixed;
    bottom: 20px;
    left: 20px;
    padding: 8px 16px;
    background: white;
    border-radius: 4px;
    font-weight: bold;
    color: #777;
  }
</style>

{#if show}
  <div transition:fade|local class="box">source: {render}</div>
{/if}