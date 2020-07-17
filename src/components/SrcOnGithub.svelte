<script>
  import { page } from "@sveltech/routify";
  let shake;
  $: $page &&
    (shake = true) &&
    setTimeout(() => {
      shake = false;
    }, 500);
</script>

<style>
  .sauce {
    position: fixed;
    right: 0;
    bottom: 0;
    background: white;
    padding: 12px 24px;
    width: 120px;
    &:hover { box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.03) }  
    & > .icon {
      float: right;
      font-size: 200%;
    }
    &, 
    &:hover {
      text-decoration: none;
    }    
  }

  @keyframes shake {
    0% { transform: translate(1px, 1px) rotate(0deg) }
    10% { transform: translate(-1px, -2px) rotate(-1deg) }
    20% { transform: translate(-3px, 0px) rotate(1deg) }
    30% { transform: translate(3px, 2px) rotate(0deg) }
    40% { transform: translate(1px, -1px) rotate(1deg) }
    50% { transform: translate(-1px, 2px) rotate(-1deg) }
    60% { transform: translate(-3px, 1px) rotate(0deg) }
    70% { transform: translate(3px, 1px) rotate(-1deg) }
    80% { transform: translate(-1px, -1px) rotate(1deg) }
    90% { transform: translate(1px, 2px) rotate(0deg) }
    100% { transform: translate(1px, -2px) rotate(-1deg) }
  }

  .shake {
    /* Start the shake animation and make the animation last for 0.5 seconds */
    animation: shake 0.4s;

    /* When the animation is finished, start again */
    animation-iteration-count: infinite;
  }
</style>

<a
  class="sauce"
  class:shake
  rel="prefetch"
  href="https://github.com/sveltech/routify-starter/tree/blog/src/pages{$page.path}.{$page.__file.ext}">
  <div class="icon">🍨</div>
  What's in
  <br />
  the sauce
</a>
