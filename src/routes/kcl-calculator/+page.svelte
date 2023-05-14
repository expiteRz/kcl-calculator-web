<script lang="ts">
	import Fa from 'svelte-fa';
	import { faCopy, faChevronDown } from '@fortawesome/free-solid-svg-icons';
	import CopyToClipboard from '../../CopyToClipboard.svelte';

	const app_version = APP_VERSION;

	let result: Number = 0;
	let variant: number = 0;

	let base_type = 'Road';
	let variant_type = 'Normal';

	async function copy_to_clipboard() {
		if (navigator.clipboard) {
			let output = document.querySelector('.area_output')!;
			return await navigator.clipboard.writeText(
				output.textContent != null ? output.textContent! : '0000'
			);
		}

		const app = new CopyToClipboard({
			target: document.getElementById('clipboard')!,
			props: { result: result.toString(16).padStart(4, '0') }
		});
		app.$destroy();
	}
</script>

<div class="_kcl-calc">
	<div class="title">
		KCL Flag Calculator
		<span class="version {app_version.includes('dev') ? 'dev' : ''}">{app_version}</span>
	</div>
	<div class="grid-container">
		<div class="grid-contents -output">
			<div class="grid-content">
				<strong>Result</strong>
				<div class="area_output">
					<div class="output_result">{result.toString(16).padStart(4, '0')}</div>
					<button on:click={copy_to_clipboard}>
						<Fa icon={faCopy} />
						<span>Copy</span>
					</button>
				</div>
				<strong>Variant</strong>
				<div class="area_output">
					<div class="output_result">{variant.toString(16).padStart(3, '0')}</div>
					<button on:click={copy_to_clipboard}>
						<Fa icon={faCopy} />
						<span>Copy</span>
					</button>
				</div>
			</div>
		</div>
		<div class="grid-contents selector">
			<div class="grid-content">
				<strong>Base Type</strong>
				<button>
					<span id="collide_type">{base_type}</span>
					<Fa icon={faChevronDown} style="margin: auto 0 auto auto" />
				</button>
			</div>
			<div class="grid-content">
				<strong>Basic Variant</strong>
				<button>
					<span id="variant_type">{variant_type}</span>
					<Fa icon={faChevronDown} style="margin: auto 0 auto auto" />
				</button>
			</div>
			<div class="grid-content">
				<strong>Shadow</strong>
				<button>
					<span id="shadow">0</span>
					<Fa icon={faChevronDown} style="margin: auto 0 auto auto" />
				</button>
			</div>
			<div class="grid-content">
				<strong>Intensity</strong>
				<button>
					<span id="intensity">0</span>
					<Fa icon={faChevronDown} style="margin: auto 0 auto auto" />
				</button>
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
	$color-selector-bg: hsl(207deg, 20%, 21%);

	._kcl-calc {
		position: relative;
		display: block;
		width: 700px;
		margin: 0 auto;
		top: 3rem;
		padding: 2rem;
		background-color: $color-main-bg;
		border-radius: 0.4rem;
		box-shadow: 0 0 2rem $color-main-shadow;

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
			grid-template-columns: 14rem 1fr;
			column-gap: 1.7rem;
		}

		.grid-contents {
			display: grid;
			grid-auto-rows: 1fr;
			gap: 1.4rem;
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
			margin: .3rem 0 .9rem 0;
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

			button {
				cursor: pointer;
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
				transition: background-color 0.1s linear, border-color 0.1s linear, color 0.1s linear;
				color: $color-selector-button-text;
				background-color: $color-selector-button-bg;

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
		}
	}
</style>
