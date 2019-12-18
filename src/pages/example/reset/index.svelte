<script>
    import { url } from '@sveltech/routify'
</script>

<style>
  .center {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
  }
</style>

<img src="/example/kevin.gif" alt="" class="center" />
<a href={$url('../../')}>Go back</a>
