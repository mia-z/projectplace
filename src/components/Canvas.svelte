<script lang="ts">
    import { randomColourName } from "$lib/utils";
    import { Application } from "svelte-pixi";
    import * as PIXI from "pixi.js";
    import { onMount } from "svelte";
    import { Viewport, Wheel } from "pixi-viewport";

    export let init = false;

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

        for (let x = 0; x < 20; x++) {
            for (let y = 0; y < 20; y++) {
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
        viewport.moveCenter(5000, 5000);
        init = true;
        
        return () => {
            tiles.forEach(tile => tile.destroy());
        }
    });
</script>

<Application
    antialias={false}
    bind:instance={app}
    width={window.innerWidth} 
    height={window.innerHeight}
>

</Application>