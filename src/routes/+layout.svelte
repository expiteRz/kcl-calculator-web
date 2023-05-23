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

<div class="_ZR {game}">
    <ZRNav {game} />
    <div class="canvas">
        <slot />
    </div>
</div>

<style lang="scss">
    $color-bg: hsl(0deg 0% 12%);
    $color-mkw-bg: hsl(207deg, 21%, 12%);

    :global(body) {
        margin: 0 auto;
        padding: 0 auto;
        font-family: 'Poppins', sans-serif;
        // background-color: $color-mkw-bg;
        color: white;
    }

    ._ZR {
        margin: 0 auto;
        background-color: $color-bg;
        min-height: 100vh;

        &.mkw {
            background-color: $color-mkw-bg;
        }
    }

    .canvas {
        margin: 0 1rem;
    }
</style>
