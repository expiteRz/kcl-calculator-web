<script lang="ts">
    import Fa from 'svelte-fa';
    import {
        faCopy,
        faChevronDown,
        faChevronLeft,
        faChevronRight
    } from '@fortawesome/free-solid-svg-icons';
    import CopyToClipboard from '../../CopyToClipboard.svelte';

    const app_version = APP_VERSION;

    let result: number = 0;
    let base_type: number = 0;
    let variant_total: number = 0;
    let variant: number = 0;
    let effect_total: number = 0;
    let shadow: number = 0;
    let intensity: number = 0;

    let base_type_label = 'Road'; // Temporarily stored
    let variant_type_label = 'Normal'; // Temporarily stored

    async function copy_to_clipboard(flag: string) {
        let encoded: string;
        switch (flag) {
            case 'variant':
                encoded = variant_total.toString(16).padStart(3, '0').toUpperCase();
            default: // Result
                encoded = result.toString(16).padStart(4, '0').toUpperCase();
                break;
        }

        if (navigator.clipboard) {
            return await navigator.clipboard.writeText(encoded);
        }

        const app = new CopyToClipboard({
            target: document.getElementById('clipboard')!,
            props: { result: encoded }
        });
        app.$destroy();
    }

    function calc_result() {
        result =
            (effect_total << 13) | (intensity << 11) | (shadow << 8) | (variant << 5) | base_type;
        variant_total = (effect_total << 8) | (intensity << 6) | (shadow << 3) | variant;
    }

    function calc_shadow(flag: string) {
        switch (flag) {
            case '+':
                shadow += shadow < 7 ? 1 : 0;
                break;
            case '-':
                shadow -= shadow > 0 ? 1 : 0;
            default:
                break;
        }
        calc_result();
    }

    function calc_intensity(flag: string) {
        switch (flag) {
            case '+':
                intensity += intensity < 3 ? 1 : 0;
                break;
            case '-':
                intensity -= intensity > 0 ? 1 : 0;
            default:
                break;
        }
        calc_result();
    }

    function set_effects(flag: number = -1) {
        switch (flag) {
            case 0:
                // !(effect_total && 0b001) ? (effect_total |= 0b001) : (effect_total ^= 0b001);
                effect_total ^= 0b001;
                break;
            case 1:
                // !(effect_total && 0b010) ? (effect_total |= 0b010) : (effect_total ^= 0b101);
                effect_total ^= 0b010;
                break;
            case 2:
                // !(effect_total && 0b100) ? (effect_total |= 0b100) : (effect_total ^= 0b011);
                effect_total ^= 0b100;
                break;
            default:
                break;
        }
        calc_result();
        console.log(effect_total.toString(2));
    }
</script>

<svelte:head>
    <title>KCL Flag Calculator | app.rz-public.xyz</title>
</svelte:head>

<div class="_kcl-calc">
    <div class="main-container">
        <div class="title">
            KCL Flag Calculator
            <span class="version {app_version.includes('dev') ? 'dev' : ''}">{app_version}</span>
        </div>
        <div class="grid-container">
            <div class="grid-contents -output">
                <div class="grid-content">
                    <strong>Result</strong>
                    <div class="area_output">
                        <div class="output_result">
                            {result.toString(16).padStart(4, '0').toUpperCase()}
                        </div>
                        <button on:click={() => copy_to_clipboard('result')}>
                            <Fa icon={faCopy} />
                            <span>Copy</span>
                        </button>
                    </div>
                    <strong>Variant</strong>
                    <div class="area_output">
                        <div class="output_result">
                            {variant_total.toString(16).padStart(3, '0').toUpperCase()}
                        </div>
                        <button on:click={() => copy_to_clipboard('variant')}>
                            <Fa icon={faCopy} />
                            <span>Copy</span>
                        </button>
                    </div>
                </div>
            </div>
            <div class="grid-contents selector">
                <div class="grid-content">
                    <strong>Base Type</strong>
                    <button class="option-main">
                        <span id="collide_type">{base_type_label}</span>
                        <Fa icon={faChevronDown} style="margin: auto 0 auto auto" />
                    </button>
                </div>
                <div class="grid-content">
                    <strong>Basic Variant</strong>
                    <button class="option-main">
                        <span id="variant_type">{variant_type_label}</span>
                        <Fa icon={faChevronDown} style="margin: auto 0 auto auto" />
                    </button>
                </div>
                <div class="grid-content">
                    <strong>Collision Type</strong>
                    <div class="option-main numeric multiple-set">
                        <button class:enabled={effect_total & 0b001} on:click={() => set_effects(0)}
                            >Trickable</button
                        >
                        <button class:enabled={effect_total & 0b010} on:click={() => set_effects(1)}
                            >Undrivable</button
                        >
                        <button class:enabled={effect_total & 0b100} on:click={() => set_effects(2)}
                            >Wall</button
                        >
                    </div>
                </div>
                <div class="grid-content">
                    <div class="numeric-grid">
                        <div>
                            <strong>Shadow</strong>
                            <div class="option-main numeric">
                                <button on:click={() => calc_shadow('-')}>
                                    <Fa icon={faChevronLeft} />
                                </button>
                                <span id="shadow">{shadow}</span>
                                <button on:click={() => calc_shadow('+')}>
                                    <Fa icon={faChevronRight} />
                                </button>
                            </div>
                        </div>
                        <div>
                            <strong>Intensity</strong>
                            <div class="option-main numeric">
                                <button on:click={() => calc_intensity('-')}>
                                    <Fa icon={faChevronLeft} />
                                </button>
                                <span id="intensity">{intensity}</span>
                                <button on:click={() => calc_intensity('+')}>
                                    <Fa icon={faChevronRight} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div id="clipboard" style="display: none;" />
</div>

<style lang="scss">
    $color-main-bg: hsl(207deg, 19%, 17%);
    $color-main-base: hsla(207deg, 28%, 90%);
    $color-main-shadow: hsl(207deg, 9%, 8%);
    $color-version-bg-dev: hsl(46deg, 90%, 51%);
    $color-output-bg: hsl(207deg, 21%, 24%);
    $color-output-bg-hover: hsl(207deg, 21%, 27%);
    $color-output-base: hsl(207deg, 28%, 72%);
    $color-output-base-hover: hsla(207deg, 28%, 90%);
    $color-output-base-active: hsl(207deg, 23%, 58%);
    $color-selector-button-border: hsl(207deg, 28%, 69%);
    $color-selector-button-border-hover: hsla(207deg, 28%, 90%);
    $color-selector-button-active: hsl(207deg, 22%, 63%);
    $color-selector-button-text: hsl(207deg, 28%, 76%);
    $color-selector-button-bg: hsla(207deg, 21%, 12%, 0.4);
    $color-selector-button-bg-hover: hsla(207deg, 21%, 23%);
    $color-selector-button-bg-hover-override: hsla(207deg, 23%, 30%);
    $color-selector-bg: hsl(207deg, 20%, 21%);

    ._kcl-calc {
        position: relative;
        display: block;
        width: 100%;
        max-width: 430px;
        margin: 0 auto;
        top: 4rem;
        // padding: 2rem;
        background-color: $color-main-bg;
        border-radius: 0.4rem;
        box-shadow: 0 0 2rem $color-main-shadow;

        @media (min-width: 700px) {
            max-width: 700px;
        }

        /* --- Reset any elements default style --- */
        button {
            padding: 0;
            border: none;
            outline: none;
            font: inherit;
            color: inherit;
            background: none;
        }
        /* End --- Reset any elements default style --- */

        .main-container {
            padding: 1.3rem;
        }

        .title {
            font-size: x-large;
            color: $color-main-base;
            text-shadow: 0 0.1rem 0.2rem $color-main-shadow;

            span.version {
                display: inline-block;
                top: -0.2rem;
                position: relative;
                color: $color-output-base-hover;
                background-color: $color-output-bg-hover;
                padding: 0.1rem 0.3rem;
                margin-left: 0.4rem;
                font-size: small;
                font-weight: 600;
                border-radius: 0.3rem;
                box-shadow: 0 0 1.3rem $color-output-bg-hover;
                text-shadow: none;

                &.dev {
                    color: $color-main-bg;
                    background-color: $color-version-bg-dev;
                    box-shadow: 0 0 1.3rem $color-version-bg-dev;
                }
            }
        }

        .grid-container {
            margin-top: 1.3rem;
            display: grid;
            grid-template-columns: 1fr;
            column-gap: 1.7rem;
        }

        @media (min-width: 700px) {
            .grid-container {
                grid-template-columns: 14rem 1fr;
            }
        }

        .grid-contents {
            display: grid;
            grid-auto-rows: 1fr;
            gap: 1.4rem;
        }

        .numeric-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            column-gap: 1.3rem;
        }

        strong {
            position: relative;
            z-index: 1000;
            font-weight: 400;
            color: $color-main-base;
            text-shadow: 0 0.1rem 0.2rem $color-main-shadow;
        }

        .area_output {
            position: relative;
            display: flex;
            // width: 300px;
            // max-width: 300px;
            margin: 0.3rem 0 1.3rem 0;
            background-color: $color-output-bg;
            padding: 0.6rem;
            border-radius: 0.3rem;
            box-shadow: 0 0 1rem $color-output-bg;
            overflow: hidden;
            transition: background-color 0.1s linear, box-shadow 0.1s linear;

            &:hover {
                background-color: $color-output-bg-hover;
                box-shadow: 0 0 1.7rem $color-output-bg-hover;
            }

            button {
                cursor: pointer;
                position: relative;
                display: block;
                color: $color-output-base;
                margin-left: auto;
                transition: color 0.1s linear, right 0.3s ease-in-out;
                right: -47px;

                &:hover {
                    color: $color-output-base-hover;
                    right: 0px;

                    span {
                        margin-left: 0.2rem;
                    }
                }

                &:active,
                &:focus {
                    color: $color-output-base-active;
                }

                span {
                    font-size: small;
                    margin-left: 0.4rem;
                    padding-right: 0.2rem;
                    transition: margin-left 0.3s ease-in-out;
                }
            }
        }

        .selector {
            border-radius: 0.4rem;
            padding: 0.96rem 1.1rem;
            background-color: $color-selector-bg;
            row-gap: 0.8rem;

            button.option-main {
                cursor: pointer;

                &:hover {
                    background-color: $color-selector-button-bg-hover;
                    border-color: $color-selector-button-border-hover;
                    color: $color-selector-button-border-hover;
                }

                &:active {
                    background-color: $color-selector-button-bg;
                    border-color: $color-selector-button-active;
                    color: $color-selector-button-active;
                }
            }

            .option-main {
                position: relative;
                display: flex;
                margin: 0.3rem 0;
                width: 100%;
                text-align: start;
                // max-width: 300px;
                padding: 0.6rem;
                border: 0.1rem solid $color-selector-button-border;
                border-radius: 0.3rem;
                overflow: hidden;
                transition: background-color 0.1s linear, border-color 0.1s linear,
                    color 0.1s linear;
                color: $color-selector-button-text;
                background-color: $color-selector-button-bg;

                span {
                    transition: color 0.1s linear;
                }

                &:hover {
                    border: 0.1rem solid $color-selector-button-border-hover;

                    span {
                        color: $color-selector-button-border-hover;
                    }
                }

                &.numeric {
                    width: auto;
                    position: relative;
                    padding: 0;

                    span {
                        margin: 0 auto;
                        padding: 0.6rem;
                    }

                    button {
                        cursor: pointer;
                        padding: 0 1rem;
                        transition: background-color 0.1s linear, color 0.1s linear;

                        &:hover {
                            background-color: $color-selector-button-bg-hover;
                            color: $color-selector-button-border-hover;
                        }

                        &:active {
                            background-color: $color-selector-button-bg;
                            color: $color-selector-button-active;
                        }
                    }
                }

                &.multiple-set {
                    display: grid;
                    grid-template-columns: 1fr 1fr 1fr;

                    button {
                        padding: 0.6rem 0;

                        &.enabled {
                            background-color: $color-selector-button-bg-hover;
                            color: $color-selector-button-border-hover;

                            &:hover {
                                background-color: $color-selector-button-bg-hover-override;
                                color: $color-selector-button-border-hover;
                            }

                            &:active {
                                background-color: $color-selector-button-bg;
                                color: $color-selector-button-active;
                            }
                        }
                    }
                }
            }
        }
    }
</style>
