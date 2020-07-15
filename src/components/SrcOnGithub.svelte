<script>
  import { page } from "@sveltech/routify";
</script>

<style>
  a {
    position: fixed;
    right: 0;
    bottom: 0;
    background: white;
    padding: 12px 24px;
    width: 120px;
    &:hover {
      box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.03);
    }
    &, &:hover {
      text-decoration: none;
    }
  }
  .icon {
    float: right;
    font-size: 200%;
  }
</style>

<a rel="prefetch" href="https://github.com/sveltech/routify-starter/tree/blog/src/pages{$page.path}.{$page.__file.ext}">
  <div class="icon">🍨</div>
  What's in
  <br />
  the sauce
</a>
