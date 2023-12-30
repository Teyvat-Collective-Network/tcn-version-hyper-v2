<script lang="ts">
    import { page } from "$app/stores";
    import Container from "$lib/components/Container.svelte";
</script>

<Container>
    <h1><b>{$page.status}</b> {$page.error?.message}</h1>
    <p>
        If you believe this is our fault, please open an issue on
        <a href="https://github.com/Teyvat-Collective-Network/tcn-version-hyper-v2/issues" target="_blank">GitHub</a> or
        <a href="/contact">contact us directly</a>.
    </p>
</Container>
