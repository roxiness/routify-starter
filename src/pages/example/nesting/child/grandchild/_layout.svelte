<script>
  import { url } from "@sveltech/routify";
</script>

<style>
  .card {
    width: 66%;
    margin: 16px;
    padding: 16px;
    border-radius: 4px;
    background: white;
    box-shadow: 0px 5px 20px 5px rgba(0, 0, 0, 0.075);
    display: inline-block;
  }
</style>

<div style="text-align: center;">
  <div class="card">
    <slot>
      <!-- optional fallback -->
    </slot>
  </div>
</div>
