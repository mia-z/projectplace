<script lang="ts">
    import { randomColourName } from "$lib/utils";
    import { Application, Text, Graphics, Container, getRenderer, Renderer, Ticker, ParticleContainer } from "svelte-pixi";
    import * as PIXI from "pixi.js";
    import { onMount } from "svelte";
    import { Viewport, Wheel } from "pixi-viewport";

    const SIZE = 10;

    let container: PIXI.Container;
    let app: PIXI.Application;
    let viewport: Viewport;

    let init = false;

    let tiles: PIXI.Sprite[] = []
    
    $: {
        console.log("ticking");
        if (app && !init) {
            viewport = new Viewport({
                screenWidth: window.innerWidth,
                screenHeight: window.innerHeight,
                worldWidth: 100,
                worldHeight: 100,
                events: app.renderer.events,
            });

            viewport
                .drag()
                .wheel();

            app.stage.addChild(viewport);

            container = new PIXI.Container();

            viewport.addChild(container);

            for (let x = 0; x < 100; x++) {
                for (let y = 0; y < 100; y++) {
                    const tile = new PIXI.Sprite(PIXI.Texture.WHITE);
                    const colour = randomColourName();
                    tile.tint = colour;

                    tile.x = x * SIZE;
                    tile.y = y * SIZE;
                    tile.height = tile.width = SIZE;

                    tiles.push(tile);
                    container.addChild(tile);
                }
            }

            viewport.setZoom(1);
            viewport.moveCenter(50,50);
            init = true;
        }
    }
    
    onMount(() => {
        return () => {
            tiles.forEach(tile => tile.destroy())
        }
    })
</script>

<Application
    antialias={false}
    bind:instance={app}
    width={window.innerWidth} 
    height={window.innerHeight}
>

</Application>