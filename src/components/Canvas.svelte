<script lang="ts">
    import { lerp, randomColourName } from "$lib/utils";
    import { Application, Text, Ticker } from "svelte-pixi";
    import * as PIXI from "pixi.js";
    import { createEventDispatcher, onMount } from "svelte";
    import { Viewport, Wheel } from "pixi-viewport";
    import reticlePng from "$assets/reticle.png";

    export let showReticle = false;
    export let canvasInit = false;
    export let roomData: RoomData = {
        roomName: "new room",
        cols: 20,
        rows: 20,
        tileSize: 100,
        tiles: [],
    };

    const SIZE = 100;

    const dispatcher = createEventDispatcher();

    let app: PIXI.Application;
    let container: PIXI.Container;
    let viewport: Viewport;
    let reticle: PIXI.Sprite;

    let reticlePos = {
        x: 150, y: 150
    };

    let newReticlePos = {
        x: 150, y: 150
    };

    onMount(() => {
        viewport = new Viewport({
            screenWidth: window.innerWidth,
            screenHeight: window.innerHeight,
            worldWidth: (roomData.rows * SIZE) + SIZE * 2,
            worldHeight: (roomData.cols * SIZE) + SIZE * 2,
            events: app.renderer.events,
        });

        viewport
            .drag()
            .wheel()
            .clamp({
                bottom: viewport.worldHeight + (viewport.worldHeight / 2),
                top: -viewport.worldHeight / 2,
                right: viewport.worldWidth + (viewport.worldWidth / 2),
                left: -viewport.worldWidth / 2,
                direction: "all",
                underflow: "center"
            })
            .clampZoom({
                minScale: 0.2,
                maxScale: 1.75
            });

        app.stage.addChild(viewport);

        container = new PIXI.Container();

        viewport.addChild(container);

        if (showReticle) {
            reticle = PIXI.Sprite.from(reticlePng);
            viewport.addChild(reticle);
            reticlePos.x = SIZE + (SIZE/2);
            reticlePos.y = SIZE + (SIZE/2);
            newReticlePos.x = reticlePos.x;
            newReticlePos.y = reticlePos.y;
            reticle.x = reticlePos.x;
            reticle.y = reticlePos.y;
            reticle.anchor.set(0.5);
            reticle.eventMode = "passive";
        }
        
        return () => {
            roomData.tiles.forEach((tile) => tile.pixiRef.destroy());
        };
    });

    export const initNewBoard = () => {
        for (let x = 0; x < roomData.rows; x++) {
            for (let y = 0; y < roomData.cols; y++) {
                const pixiTile = new PIXI.Sprite(PIXI.Texture.WHITE);
                const tile: TileProps = {
                    x, y,
                    colour: randomColourName(),
                    pixiRef: pixiTile
                };
                tile.pixiRef.tint = tile.colour;
                tile.pixiRef.x = (x * SIZE) + SIZE;
                tile.pixiRef.y = (y * SIZE) + SIZE;
                tile.pixiRef.height = tile.pixiRef.width = SIZE;
                tile.pixiRef.eventMode = "dynamic";
                tile.pixiRef.on("click", (event: PIXI.FederatedPointerEvent) => {
                    console.log("pressed")
                    newReticlePos.x = tile.pixiRef.x + 50;
                    newReticlePos.y = tile.pixiRef.y + 50;
                    dispatcher("tilepress", tile);
                });
                roomData.tiles.push(tile);
                container.addChild(tile.pixiRef);
            }
        }

        viewport.fitWorld(true);
        viewport.clampZoom({
            minScale: viewport.scale.x
        });
        canvasInit = true;
    }

</script>

<div class={"absolute left-0 top-0 z-10 overflow-auto"}>
    <Application
        bind:instance={app}
        antialias={false}
        width={window.innerWidth}
        height={window.innerHeight}
        backgroundAlpha={0}
    >
        {#if showReticle}
            <Ticker
                on:tick={(event) => {
                    if (reticlePos.x !== newReticlePos.x || reticlePos.y !== newReticlePos.y) {
                        reticlePos.x = Math.round(lerp(reticlePos.x, newReticlePos.x, event.detail / 8) * 100) / 100;
                        reticlePos.y = Math.round(lerp(reticlePos.y, newReticlePos.y, event.detail / 8) * 100) / 100;

                        reticle.x = reticlePos.x;
                        reticle.y = reticlePos.y;
                    }
                }} 
            />
        {/if}
    </Application>
</div>
