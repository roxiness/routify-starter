<script>
  import { TabsTransition } from "@sveltech/routify/decorators";
  import { writable } from "svelte/store";
  import BottomNav from "./_components/BottomNav.svelte";
  import { url, isActive } from "@sveltech/routify";


  const width = writable();
  const color = writable();
  const _urls = [
    ["Home", "./home", "#7fc5bb"],
    ["Feed", "./feed", "#0bf5cc"],
    ["Updates", "./updates", "#88f0d0"],
    ["Settings", "./settings", "#a1fac3"]
  ];
  $: urls = _urls.map(([name, path, color]) => ({
    name,
    href: $url(path),
    color,
    active: !!$isActive(path)
  }));
</script>

<style>
  :global(body) {
    padding: 0;
  }
  * :global(.inset) {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  main.inset {
    bottom: 64px;
    overflow: hidden;
  }

  * :global(*) {
    text-align: center;
  }
  a {
    position: fixed;
    top: 0;
    left: 0;
    padding: 8px 16px;
    background: #555;
    color: white;
  }
</style>

<div style="height: 100%">

  <main class="inset" bind:offsetWidth={$width}>
    <slot decorator={TabsTransition} scoped={{ width }} />
  </main>
  <BottomNav {urls} height="64px" />
</div>

<a href={$url('../../')}>Back to examples</a>
