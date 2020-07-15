<script>
  import { Router } from "@sveltech/routify";
  import { routes } from "../.routify/routes";
</script>

<style global>
  @import "../static/global.css";
  @import "../static/blog.pcss";
  @import "https://cdnjs.cloudflare.com/ajax/libs/prism/1.20.0/themes/prism-okaidia.min.css";
</style>

<Router {routes} />
