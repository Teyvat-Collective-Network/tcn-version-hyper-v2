<script lang="ts">
    import { page } from "$app/stores";
    import Layout from "$lib/components/Layout.svelte";
    import Navbar from "$lib/components/Navbar.svelte";
    import { darkMode, token, user } from "$lib/stores";
    import "../app.css";

    token.set($page.data.token);
    darkMode.set($page.data.darkMode);
    user.set($page.data.user);
</script>

<Layout>
    <div id="main">
        <Navbar></Navbar>
        <div id="slot">
            <slot />
        </div>
    </div>
</Layout>

<style lang="scss">
    #main {
        background-color: var(--page-background);
        display: flex;
        flex-direction: column;
        min-height: 100%;
    }

    #slot {
        flex-grow: 1;
    }
</style>
