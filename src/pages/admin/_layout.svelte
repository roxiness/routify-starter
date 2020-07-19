<script>
	import { ready } from '@sveltech/routify'
	import { authStore } from '../../auth.js'
	import Login from '../login/index.svelte'
	const { user, authenticated, loading } = authStore

	/**
	 * since SSR normally won't render till all components have been loaded
	 * and our <slot /> will never load, we will have to let SSR do its job
	 * right away by calling $ready()
	 **/
	$ready()
</script>

{#if !routify.inBrowser}
	SPA only
{:else if $loading}
	<div class="center-all">
		<h1>Loading...</h1>
	</div>
{:else if $user}
	<slot />
{:else}
	<Login />
{/if}
