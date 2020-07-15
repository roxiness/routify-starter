<script>
  import { metatags, page } from "@sveltech/routify";
  import Navigation from "./_navigation.svelte";
  import SrcOnGithub from "../components/SrcOnGithub.svelte";

  $: metatags.title = `My Routify app - ${$page.title}`;
  metatags.description = "Description coming soon...";
</script>

<div class="container">
  <Navigation />
  <slot />
</div>

<SrcOnGithub />
