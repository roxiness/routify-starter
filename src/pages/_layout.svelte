<script>
	import Navigation from './_navigation.svelte'
</script>

<div class="app">
	<header>
		<Navigation />
	</header>

	<main>
		<slot />
	</main>

	<footer>
		<a href="https://github.com/roxiness/routify-starter/tree/auth">Github repo</a>
		| Backgrounds by
		<a href="https://www.svgbackgrounds.com/">svgbackgrounds.com</a>
	</footer>
</div>
