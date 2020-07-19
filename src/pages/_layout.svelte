<script>
  import { authStore } from "../auth";
  const { user, signout } = authStore;
  const links = [
    ["/index", "home"],
    ["/about", "about"],
    ["/admin", "admin"],
  ];
</script>

<style>
  :global(body) {padding: 0; margin: 0}
    .app {
    display: grid;
    grid-template-rows: auto 1fr;
    min-height: 100vh;
  }
</style>

<div class="app">
  <header>
    <nav>
      {#each links as [path, name]}
        <a href={path}>{name}</a>
      {/each}
      {#if $user}
        <a href="#signout" on:click={signout}>signout</a>
      {:else}
        <a href="/login">login</a>
      {/if}
    </nav>
  </header>

  <main>
    <slot />
  </main>
</div>
