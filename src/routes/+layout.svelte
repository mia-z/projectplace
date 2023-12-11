<script lang="ts">
    import "$styles/base.scss";
</script>

<div class={"relative"}>
    <div class={"overlay w-screen h-48 absolute -bottom-[100vh] left-0 bg-blue-400 z-20"}>
    </div>
    <slot />
</div>
