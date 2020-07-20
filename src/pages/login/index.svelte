<script>
	import { authStore } from '../../auth'
	const { signin } = authStore
</script>

<div class="center-all">
	<div class="card">
		<h3>We're super lazy about our login form</h3>
		<p>So we leave it to auth0</p>
		<button class="button" on:click={signin}>sign in</button>
	</div>
</div>
