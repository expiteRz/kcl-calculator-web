<script lang="ts">
    import Fa from 'svelte-fa';
    import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

    export let game: string;
</script>

<div class="nav {game}">
    <a href="https://rz-public.xyz">
        <Fa icon={faRightFromBracket} size="1.3x" />
        <span>Back to rz-public.xyz</span>
    </a>
</div>

<style lang="scss">
    $home-btn-base: hsl(207deg, 28%, 69%);
    $home-btn-bg: hsla(207deg, 21%, 12%, 0.4);
    $home-btn-base-hover: hsla(207deg, 28%, 90%);
    $home-btn-bg-hover: hsla(207deg, 21%, 12%);
    $home-btn-default-base: hsl(0deg, 0%, 69%);
    $home-btn-default-bg: hsla(0deg, 0%, 12%, 0.4);
    $home-btn-default-base-hover: hsla(0deg, 0%, 90%);
    $home-btn-default-bg-hover: hsla(0deg, 0%, 12%);

    .nav {
        position: fixed;
        display: block;
        width: 100%;
        height: 4.07rem;
        z-index: 1000;

        a {
            margin: 0.7rem;
            position: absolute;
            text-decoration: none;
            font-size: small;
            padding: 0.6rem 0.76rem;
            border: 0.1rem solid $home-btn-default-base;
            border-radius: 0.35rem;
            color: $home-btn-default-base;
            background-color: $home-btn-default-bg;
            transition: background-color 0.1s linear, color 0.1s linear, border-color 0.1s linear;

            &:hover {
                background-color: $home-btn-default-bg-hover;
                color: $home-btn-default-base-hover;
                border-color: $home-btn-default-base-hover;

                span {
                    display: inline-block;
                }
            }

            span {
                display: none;
                margin-left: 0.5rem;
            }
        }

        &.mkw {
            a {
                border-color: $home-btn-base;
                color: $home-btn-base;
                background-color: $home-btn-bg;

                &:hover {
                    border-color: $home-btn-base-hover;
                    color: $home-btn-base-hover;
                    background-color: $home-btn-bg-hover;
                }
            }
        }
    }
</style>
