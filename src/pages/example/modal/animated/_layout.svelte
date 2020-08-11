<script>
  import { url, context, afterPageLoad } from "@roxi/routify";
  import { crossfade, fade } from "svelte/transition";
  import Target from "./_target.svelte";

  const [send, receive] = crossfade({});
  $: _key = $context.child && $context.child.params.key
</script>

<div class="cards">
  {#each Array(12) as item, key}
    <a class="card" href={$url('./:key', { key })} style="background: #333">
      <!-- <Target/> is a placeholder that takes the size of its parent element. 
      If a modal is show and its key matches this cards key, <Target/> is hidden.
      This triggers the modal transition. -->
      <Target {receive} {send} hide={key == _key} />
      <div class="content" style="color: white">{key}</div>
    </a>
  {/each}
</div>
<slot scoped={{ send, receive, fade, key: _key }} />
