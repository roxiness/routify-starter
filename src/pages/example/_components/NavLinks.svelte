<script>
  import { url, isActive } from "@roxi/routify";
  let show = false;
  const _links = [
    ["/", "⯇ BACK TO APP"],
    ["./index", "Home"],
    ["./modal", "Modal"],
    ["./reset", "Reset"],
    ["./layouts", "Layouts"],
    ["./widget", "Widget"],
    ["./aliasing", "Aliasing"],
    ["./404", "404"],
    ["./api", "Api"],
    ["./app", "App"],
    ["./transitions/tabs", "Transitions"],
  ];

  function handleBurger() {
    show = !show;
  }
</script>

<style>
  aside {
    text-align: center;
  }
  nav {
    background: white;
  }

  .link {
    display: block;
    white-space: nowrap;
  }
  .active {
    font-weight: bold;
  }
  .mobile-nav {
    font-size: 18px;
    background: white;
    padding: 8px;
    box-shadow: 0px 5px 20px 5px rgba(0, 0, 0, 0.075);
    display: block;
  }
  .mobile-nav * {
    vertical-align: middle;
  }
  .title {
    
    top: 6px;
    left: 0;
    right: 0;
    text-align: center;
  }

  .burger {
    font-size: 24px;
    position: absolute;
    left: 8px;
    top: 4px;
  }
  nav {    
    display: none;
    width: 100%;
    padding: 16px;
    z-index: 1;
  }

  @media (min-width: 640px) {
    nav {
      margin: 16px;
      border-radius: 4px;
      box-shadow: 0px 5px 20px 5px rgba(0, 0, 0, 0.075);
      display: inline-block;
      position: relative;
      width: auto;
    }
    .link {
      padding: 0 16px;
      min-width: 56px;
      display: inline-block;
    }

    .mobile-nav {
      display: none;
    }
  }

  nav.show {
    display: block;
  }
</style>

<aside>
  <nav class="mobile-nav">
    <span class="burger" on:click={handleBurger}>☰</span>
    <span class="title">Routify Examples</span>
    <span />
  </nav>
  <nav class:show on:click={() => (show = false)}>
    {#each _links as [path, name]}
      <a class="link" class:active={$isActive(path)} href={$url(path)}>
        {name}
      </a>
    {/each}
  </nav>
</aside>
