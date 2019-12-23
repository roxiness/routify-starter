<script>
    import {url } from '@sveltech/routify'
</script>


<div style="text-align: center">
<h4 ><a href={$url('./')}>Show songs</a></h4>

<slot><!-- optional fallback --></slot>
</div>