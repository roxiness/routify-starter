<script>
  import { url, isActive } from "@sveltech/routify";
  const _links = [
    ["./index", "Home"],
    ["./modal", "Modal"],
    ["./reset", "Reset"],
    ["./nesting", "Nesting"],
    ["./widget", "Widget"],
    ["./404", "404"]
  ];

  $: links = _links.map(([path, name]) => {
    return {
      href: $url(path, {}),
      name,
      active: $isActive(path)
    };
  });
</script>

<style>
  aside {
    text-align: center;
  }
  .nav {
    margin: 16px;
    padding: 16px;
    border-radius: 4px;
    background: white;
    box-shadow: 0px 5px 20px 5px rgba(0, 0, 0, 0.075);
    display: inline-block;
  }
  .link {
    padding: 0 16px;
    width: 64px;
    display: inline-block;
  }
  .backlink {
    position: absolute;
    left: 16px;
    color: white;
    font-weight: bold;
  }
  .active {font-weight: bold}
</style>

<aside>
  <div class="nav">
    <a class="backlink" href={$url('/')}>&#8656; BACK TO APP</a>
    {#each links as { href, name, active }}
      <a class="link" class:active {href}>{name}</a>
    {/each}
  </div>
</aside>
