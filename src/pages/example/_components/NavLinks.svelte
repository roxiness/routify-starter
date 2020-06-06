<script>
  import { url, isActive } from "@sveltech/routify";
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
  .nav {
    background: white;
  }

  .link {
    display: block;
    white-space: nowrap;
  }
  .active {
    font-weight: bold;
  }
  .burger {
    font-size: 24px;
    position: absolute;
    top: 4px;
    left: 8px;
    z-index: 2;
  }
  .nav {
    position: absolute;
    display: none;
    width: 100%;
    padding: 16px;
      z-index:1
  }
  .nav.show {
    display: block;
  }

  @media (min-width: 640px) {
    .nav {
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

    .backlink {
      position: absolute;
      left: 16px;
      color: #c848c1;
      font-weight: bold;
    }
    .burger {
      display: none;
    }
  }
</style>

<aside>
  <div class="burger" on:click={handleBurger}>☰</div>
  <div class="nav" class:show on:click={() => (show = false)}>
    <a class="backlink" href={$url('/')} />
    {#each _links as [path, name]}
      <a class="link" class:active={$isActive(path)} href={$url(path)}>
        {name}
      </a>
    {/each}
  </div>
</aside>
