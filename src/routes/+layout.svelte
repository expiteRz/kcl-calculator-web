<script>
	import '@fontsource/poppins';
	import ZRNav from './Nav.svelte';
</script>

<div class="_ZR">
	<ZRNav />
	<slot />
</div>

<style lang="scss">
	$color-bg: hsl(207deg 21% 12%);

	:global(body) {
        margin: 0 auto;
        padding: 0 auto;
		font-family: 'Poppins', sans-serif;
		background-color: $color-bg;
		color: white;
	}
</style>
