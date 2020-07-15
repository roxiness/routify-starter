<script>
  import Navigation from "./_navigation.svelte";
  import SrcOnGithub from "../components/SrcOnGithub.svelte";
</script>

<div class="container">
  <Navigation />
  <slot />
</div>

<SrcOnGithub />