<script lang="ts">
    import { randomColourName } from "$lib/utils";
    import { Application } from "svelte-pixi";
    import * as PIXI from "pixi.js";
    import { onMount } from "svelte";
    import { Viewport, Wheel } from "pixi-viewport";

    export let canvasInit = false;
    export let roomData: RoomData = {
        roomName: "new room",
        cols: 20,
        rows: 20,
        tileSize: 100,
        tiles: [],
    };

    const SIZE = 100;

    let container: PIXI.Container;
    let app: PIXI.Application;
    let viewport: Viewport;

    let tiles: PIXI.Sprite[] = [];

    onMount(() => {
        viewport = new Viewport({
            screenWidth: window.innerWidth,
            screenHeight: window.innerHeight,
            worldWidth: roomData.rows * SIZE,
            worldHeight: roomData.cols * SIZE,
            events: app.renderer.events,
        });

        viewport
            .drag()
            .wheel();

        app.stage.addChild(viewport);

        container = new PIXI.Container();

        viewport.addChild(container);

        return () => {
            tiles.forEach((tile) => tile.destroy());
        };
    });

    const initNewBoard = () => {
        for (let x = 0; x < roomData.rows; x++) {
            for (let y = 0; y < roomData.cols; y++) {
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
        viewport.moveCenter(
            (roomData.rows * SIZE) / 2,
            (roomData.cols * SIZE) / 2,
        );
        canvasInit = true;
    };
</script>

<div class={"absolute left-0 top-0 z-10"}>
    <Application
        bind:instance={app}
        antialias={false}
        width={window.innerWidth}
        height={window.innerHeight}
        backgroundAlpha={0}
    />
</div>
