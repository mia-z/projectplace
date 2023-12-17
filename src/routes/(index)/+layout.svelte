<script lang="ts">
    import { QueryClient, QueryClientProvider } from "@sveltestack/svelte-query";
    import "$styles/base.scss";

    const client = new QueryClient();
</script>

<QueryClientProvider {client}>
    <div class={"relative"}>
        <slot />
    </div>
</QueryClientProvider>
