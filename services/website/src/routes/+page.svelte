<script lang="ts">
    import Container from "$lib/components/Container.svelte";
</script>

<Container>
    <div id="front-page">
        <div id="top-left" class="panel">Welcome to the Teyvat Collective Network (TCN)!</div>
        <div id="top-right" class="panel highlight">
            The mission of the TCN is to unite all mains servers across Teyvat and provide support and promote collaboration between partners.
        </div>
        <div id="bottom-left" class="panel">
            The TCN is a network of -1 high-quality Genshin Impact Discord servers that are dedicated to fostering Mains-style fan communities.
        </div>
        <div id="bottom-right" class="panel">
            <span>Do you own a Discord server dedicated to a playable Genshin Impact character and want to join the TCN? Apply <a href="/join">here</a>!</span>
        </div>
    </div>
</Container>

<style lang="scss">
    #front-page {
        display: grid;
        gap: 1rem;
        grid-template-columns: repeat(10, 1fr);

        & > * {
            align-items: center;
            display: flex;
            flex-direction: row;
            margin: 0;
            padding: 3.2rem;
        }
    }

    @media screen and (min-width: 1200px) {
        #top-left {
            grid-column: 1 / 5;
        }

        #top-right {
            grid-column: 5 / 11;
        }

        #bottom-left {
            grid-column: 1 / 6;
        }

        #bottom-right {
            grid-column: 6 / 11;
        }
    }

    @media screen and (max-width: 1199px) {
        #front-page > .panel {
            grid-column: 1 / 11;
        }
    }

    #top-left {
        font-size: 240%;
        font-weight: 600;
        line-height: 120%;
    }

    #top-right {
        font-size: 160%;
        font-weight: 400;
        line-height: 150%;
    }

    #bottom-left {
        font-size: 132%;
        line-height: 175%;
    }

    #bottom-right {
        font-size: 132%;
        line-height: 175%;
    }

    :global(#join) {
        font-weight: 400;
    }
</style>
