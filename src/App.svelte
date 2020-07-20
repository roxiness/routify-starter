<script>
	import { Router } from '@sveltech/routify'
	import { routes } from '@sveltech/routify/tmp/routes'
  import { authStore } from './auth.js'

	// we need to queue our init till after Routify has been initialized
	setTimeout(() => window.routify.inBrowser && authStore.init())
</script>

<Router {routes} />
