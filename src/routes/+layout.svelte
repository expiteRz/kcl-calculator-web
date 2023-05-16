<script lang="ts">
    import '@fontsource/poppins';
    import ZRNav from './Nav.svelte';
    import { page } from '$app/stores';

    let game: string;
    switch ($page.url.pathname) {
        case '/kcl-calculator':
            game = 'mkw';
            break;
        default:
            game = '';
            break;
    }
</script>

<ZRNav {game} />
<div class="_ZR">
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

    ._ZR {
        margin: 0 1rem;
    }
</style>
