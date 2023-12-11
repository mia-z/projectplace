<script lang="ts">
    import { randomColourName } from "$lib/utils";
    import { Application } from "svelte-pixi";
    import * as PIXI from "pixi.js";
    import { onMount } from "svelte";
    import { Viewport, Wheel } from "pixi-viewport";

    export let rows = 20;
    export let cols = 20;
    export let canvasInit = false;

    const SIZE = 100;

    let container: PIXI.Container;
    let app: PIXI.Application;
    let viewport: Viewport;

    let tiles: PIXI.Sprite[] = []

    onMount(() => {
        viewport = new Viewport({
            screenWidth: window.innerWidth,
            screenHeight: window.innerHeight,
            worldWidth: 100000,
            worldHeight: 100000,
            events: app.renderer.events,
        });

        viewport
            .drag()
            .wheel();

        app.stage.addChild(viewport);

        container = new PIXI.Container();

        viewport.addChild(container);

        for (let x = 0; x < rows; x++) {
            for (let y = 0; y < cols; y++) {
                const tile = new PIXI.Sprite(PIXI.Texture.WHITE);
                tile.tint = randomColourName();

                tile.x = x * SIZE;
                tile.y = y * SIZE;
                tile.height = tile.width = SIZE;
                tile.eventMode = "dynamic";
                tile.on("click", (event: PIXI.FederatedPointerEvent) => {
                    tile.tint = randomColourName();
                });

                tiles.push(tile);
                container.addChild(tile);
            }
        }

        viewport.setZoom(0.1);
        viewport.moveCenter((rows * SIZE) / 2, (cols * SIZE) / 2);
        canvasInit = true;
        
        return () => {
            tiles.forEach(tile => tile.destroy());
        }
    });
</script>


<div class={"absolute top-0 left-0 z-10"}>
    <Application
        bind:instance={app}
        antialias={false}
        width={window.innerWidth} 
        height={window.innerHeight}
        backgroundAlpha={0}
    />
</div>