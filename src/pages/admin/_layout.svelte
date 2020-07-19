<script>
  import { authStore } from "../../auth.js";
  import Login from "../login/index.svelte";
  const { user, authenticated, loading } = authStore;
</script>

{#if $loading}
  Loading...
{:else if !$authenticated}
  Authenticating...
{:else if $user}
  <slot />
{:else}
  <Login />
{/if}
