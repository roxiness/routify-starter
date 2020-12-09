<script>
	import { authStore } from '../../auth'
	import { redirect } from '@roxi/routify'
	const { user } = authStore

	/**
	 *  We don't want the login page to visible to logged in user, so we redirect them
	 **/
	$: if ($user) $redirect('/')
</script>

<slot />
