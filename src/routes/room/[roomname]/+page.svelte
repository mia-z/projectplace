<script lang="ts">
    import Canvas from "$components/Canvas.svelte";
    import { onMount } from "svelte";
    import type { PageData } from "./$types";
    import { randomColourName } from "$lib/utils";

    export let data: PageData;

    let canvas: Canvas;

    onMount(() => {
        canvas.initNewBoard();
    });

    const onTilePress = (event: CustomEvent<TileProps>) => {
    }
</script>

<Canvas
    bind:this={canvas}
    showReticle
    on:tilepress={onTilePress}
/>
