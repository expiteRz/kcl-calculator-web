<script lang="ts">
    import { onMount } from 'svelte';

    export let result: string;

    let textarea: HTMLTextAreaElement;

    onMount(() => {
        textarea.select();
        document.execCommand('copy');
        // window.alert("result copied: execCommand");
    });
</script>

<textarea bind:value={result} bind:this={textarea} />
