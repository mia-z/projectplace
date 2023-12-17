<script lang="ts">
    import { randomColourName } from "$lib/utils";
    import { onMount } from "svelte";
    import { useQuery } from "@sveltestack/svelte-query";
    import Canvas from "$components/Canvas.svelte";

    let canvasRef: Canvas;
    let canvasZoom: number = 2;
    let roomData: RoomData = {
        rows: 30,
        cols: 30,
        roomName: "test",
        tiles: [],
        tileSize: 100
    }

    onMount(() => {
        canvasRef.initNewBoard();

        let changerInterval = setInterval(() => {
            roomData.tiles[Math.floor(Math.random() * (roomData.cols * roomData.rows))].pixiRef.tint = randomColourName();
        }, 200);

        return () => {
            clearInterval(changerInterval);
        }
    });
</script>

<div class={"static top-0 left-0 z-50"}>
    <Canvas 
        bind:this={canvasRef}
        bind:roomData
    />
</div>

<div class={"relative flex h-screen z-20"}>
    <div class={"flex flex-col m-auto w-192 bg-zinc-200/90 shadow-xl backdrop-blur-sm"}>
        <div class={"font-roboto-monospace flex flex-row h-8"}>
            <div class={"flex bg-black h-full px-2 text-white"}>
                <div class={"my-auto"}>
                    [project]
                </div>
            </div>
            <div class={" my-auto"}>
                &nbsp;place
            </div>
        </div>
        <div class={"grid grid-flow-row grid-cols-3 gap-4 overflow-auto my-5"}>
            {#if true}
                {#each Array.from(new Array(3)) as _, index}
                    <div class={"room-card loading flex flex-col p-2 space-y-1"}>
                        <div class={"flex flex-row w-6/12 space-x-1 mt-auto"}>
                            <div class={"h-5 w-1/2 rounded-md bg-zinc-600 animate-pulse"}></div>
                            <div class={"h-5 w-1/2 rounded-md bg-zinc-600 animate-pulse"}></div>
                        </div>
                        <div class={"w-4/12 h-5 rounded-md bg-zinc-600 animate-pulse"}></div>
                        <div class={"flex flex-row w-9/12 space-x-1"}>
                            <div class={"h-5 w-1/6 rounded-md bg-zinc-600 animate-pulse"}></div>
                            <div class={"h-5 w-5/6 rounded-md bg-zinc-600 animate-pulse"}></div>
                        </div>
                        <div class={"flex flex-row w-9/12 space-x-1"}>
                            <div class={"h-5 w-3/4 rounded-md bg-zinc-600 animate-pulse"}></div>
                            <div class={"h-5 w-1/4 rounded-md bg-zinc-600 animate-pulse"}></div>
                        </div>
                    </div>
                {/each}
            {/if}
        </div>
    </div>
</div>


<style lang="scss">
    :root {
        @apply bg-zinc-800;
        background-color: #565656;
        background-image: url("data:image/svg+xml,%3Csvg width='84' height='48' viewBox='0 0 84 48' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h12v6H0V0zm28 8h12v6H28V8zm14-8h12v6H42V0zm14 0h12v6H56V0zm0 8h12v6H56V8zM42 8h12v6H42V8zm0 16h12v6H42v-6zm14-8h12v6H56v-6zm14 0h12v6H70v-6zm0-16h12v6H70V0zM28 32h12v6H28v-6zM14 16h12v6H14v-6zM0 24h12v6H0v-6zm0 8h12v6H0v-6zm14 0h12v6H14v-6zm14 8h12v6H28v-6zm-14 0h12v6H14v-6zm28 0h12v6H42v-6zm14-8h12v6H56v-6zm0-8h12v6H56v-6zm14 8h12v6H70v-6zm0 8h12v6H70v-6zM14 24h12v6H14v-6zm14-8h12v6H28v-6zM14 8h12v6H14V8zM0 8h12v6H0V8z' fill='%23a09fa1' fill-opacity='0.29' fill-rule='evenodd'/%3E%3C/svg%3E");
    }

    .room-card {
        @apply h-36 w-full p-1 bg-zinc-300 font-nunito rounded-md shadow-lg;

        &.loading {
            @apply bg-transparent border-2 border-zinc-600 animate-pulse;
            background-color: rgba(2,2,2,0.3);
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23e8e8e8' fill-opacity='0.1'%3E%3Cpath opacity='.5' d='M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z'/%3E%3Cpath d='M6 5V0H5v5H0v1h5v94h1V6h94V5H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }
    }
</style>