<script>
	import { Router } from '@roxi/routify'
	import { routes } from '@roxi/routify/tmp/routes'
	import { authStore } from './auth.js'

	// we need to queue our init till after Routify has been initialized
	setTimeout(() => window.routify.inBrowser && authStore.init())
</script>

<style global>
	@import "../static/app.css";
	@import "../static/global.css";
  </style>

<Router {routes} />
