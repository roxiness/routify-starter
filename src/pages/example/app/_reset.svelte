<script>
  import { goto, url } from "@roxi/routify";
  import { user } from "./_store";

  /** We set the static parameter to true since we don't want to change the browser's URL
   *  Notice the $: prefix which makes the statement reactive. This way if the user logs
   *  out the $goto is called again.
   * **/
  $: if (!$user) $goto("./login", {}, true);

  function logout() {
    $user = false;
  }
</script>

{#if $user}
  <a href={$url('/example')}>Back to examples</a>
  <a href={$url('./')}>Home</a>
  <a href={$url('./about')}>About</a>
  <button on:click={logout} style="position: absolute; right: 24px">
    Logout
  </button>

  <slot>
    <!-- optional fallback -->
  </slot>
{/if}