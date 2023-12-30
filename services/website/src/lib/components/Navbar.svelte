<script lang="ts">
    import { browser } from "$app/environment";
    import { page } from "$app/stores";
    import { darkMode, user } from "$lib/stores";
    import Container from "./Container.svelte";
    import Icon from "./Icon.svelte";
    import Timestamp from "./Timestamp.svelte";

    let dark = true;
    let width: number = Infinity;
    let sidebarOpen = false;

    $: wide = width >= 1368;

    if (browser) {
        const stored = localStorage.getItem("theme");

        if (stored === "dark" || (!stored && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
            dark = true;
            document.documentElement.classList.add("dark");
        } else {
            dark = false;
            document.documentElement.classList.remove("dark");
        }

        document.addEventListener("click", (e) => {
            const target = e.target as HTMLAnchorElement;
            if (target.classList.contains("sidebar-button") && target.href !== "javascript:void(0)") sidebarOpen = false;
        });
    }

    function toggleTheme() {
        darkMode.set((dark = !dark));
        localStorage.setItem("theme", dark ? "dark" : "light");
        dark ? document.documentElement.classList.add("dark") : document.documentElement.classList.remove("dark");
    }
</script>

<svelte:window bind:innerWidth={width} />

{#if !wide}
    <div id="bar"></div>
    <div id="spacer"></div>
{/if}

<Container>
    <nav id="navbar">
        <span id="home">
            <img id="home-icon" src="/favicon.png" alt="TCN Icon" />
            <div id="home-label">Teyvat Collective Network</div>
        </span>
        <span class="flex-spacer"></span>
        {#if wide}
            <a class="navbutton" href="/">Home</a>
            <a class="navbutton" href="/about">About</a>
            <a class="navbutton" href="/partners">Partners</a>
            <a class="navbutton highlight" href="/join">Join the TCN</a>
        {/if}
    </nav>
</Container>

<div id="toggle">
    <svg role="none" viewBox="0 0 100 100" class={sidebarOpen ? "open" : ""} on:click={() => (sidebarOpen = !sidebarOpen)}>
        <rect id="top" x="10" y="10" width="80" height="10" />
        <rect id="mid" x="10" y="45" width="80" height="10" />
        <rect id="bot" x="10" y="80" width="80" height="10" />
    </svg>
</div>

<div id="overlay" class={sidebarOpen ? "" : "hide"} role="none" on:click={() => (sidebarOpen = false)}></div>

<nav id="sidebar" class={sidebarOpen ? "" : "hide"}>
    <a class="sidebar-button t1" href={"javascript:void(0)"} on:click={toggleTheme}>
        <Icon icon={dark ? "sun" : "moon"}></Icon> Switch to {dark ? "Light" : "Dark"} Mode
    </a>
    <a class="sidebar-button t1" href="/"><Icon icon="home"></Icon> Home</a>
    <a class="sidebar-button t1" href="/about"><Icon icon="info-circle"></Icon> About Us</a>
    <a class="sidebar-button t1" href="/partners"><Icon icon="handshake"></Icon> Partners</a>
    <a class="sidebar-button t1" href="/join"><Icon icon="door-open"></Icon> Join</a>
    <a class="sidebar-button t1" href="/info/constitution"><Icon icon="building-columns"></Icon> Constitution</a>
    <a class="sidebar-button t1" href="/contact"><Icon icon="phone"></Icon> Contact Us</a>
    {#if $user?.observer}
        <a class="sidebar-button t1" href="/admin"><Icon icon="screwdriver-wrench"></Icon> Admin Dashboard</a>
    {/if}
    {#if $user}
        <a class="sidebar-button t1" href="/auth/logout?{new URLSearchParams({ redirect: $page.url.pathname })}">
            <Icon icon="right-from-bracket"></Icon> Log Out
        </a>
    {:else}
        <a class="sidebar-button t1" href="/auth/login?{new URLSearchParams({ redirect: $page.url.pathname })}">
            <Icon icon="right-to-bracket"></Icon> Log In
        </a>
    {/if}
    <span class="flex-spacer"></span>
    {#if $user}
        <span id="logged-in-as">Logged in as {$user.username}</span>
    {/if}
    <span id="copyright">&copy; 2024 TCN Development Team</span>
    <span id="last-loaded">Page last loaded: <Timestamp ms timestamp={Date.now()}></Timestamp></span>
</nav>

<style lang="scss">
    #bar,
    #spacer {
        height: 80px;
    }

    #bar {
        background-color: var(--toggle-bar-bg);
        left: 0;
        position: fixed;
        right: 0;
        top: 0;
    }

    #navbar {
        align-items: center;
        display: flex;
        flex-direction: row;
        overflow-x: hidden;
        padding: 2rem 0;

        a {
            color: inherit;
        }
    }

    #overlay {
        background-color: var(--overlay-bg);
        position: fixed;
        inset: 0;
        backdrop-filter: blur(2px);
        transition: 250ms opacity ease-in-out;

        &.hide {
            opacity: 0;
            pointer-events: none;
        }
    }

    #sidebar {
        background-color: var(--sidebar-bg);
        bottom: 0;
        display: flex;
        flex-direction: column;
        align-items: stretch;
        padding-top: 80px;
        position: fixed;
        top: 0;
        transition:
            transform 250ms,
            opacity 250ms;
        width: 25%;
        z-index: 5;

        @media screen and (max-width: 1000px) {
            width: 75%;
        }

        &.hide {
            opacity: 0%;
            pointer-events: none;
            transform: translateX(-100%);
        }

        &:not(.hide) {
            opacity: 100%;
            transform: translateX(0);
        }
    }

    .sidebar-button {
        align-items: center;
        color: var(--sidebar-button-fg);
        display: flex;
        flex-direction: row;
        font-weight: bold;
        gap: 0.5rem;
        transition: background-color 120ms linear;
        padding: 0.32rem 0;

        &:hover {
            background-color: var(--sidebar-button-hover-bg);
        }
    }

    .t1 {
        padding-left: 1rem;
    }

    .navbutton {
        border-bottom: 3px solid transparent;
        font-size: 120%;
        font-weight: bold;
        margin: 0 1rem;
        padding-bottom: 0.25rem;
        transition: border-bottom 200ms;

        &:hover {
            border-color: var(--navbutton-underline);
        }
    }

    #home {
        align-items: center;
        display: flex;
        flex-direction: row;
        gap: 1rem;
    }

    #home-icon {
        height: 80px;
        width: 80px;
    }

    #home-label {
        font-size: 200%;
        font-weight: bold;
    }

    svg {
        cursor: pointer;
        height: 32px;
        outline: none;
        padding: 24px;
        width: 32px;
    }

    rect {
        fill: var(--toggle-button);
        transition:
            transform 250ms cubic-bezier(0, 1, 0.6, 1.4),
            opacity 250ms cubic-bezier(0, 1, 0.6, 1.4);
    }

    #toggle {
        border-bottom-right-radius: 5px;
        width: 80px;
        position: fixed;
        z-index: 15;

        #top {
            transform-origin: 15% 15%;
        }

        #mid {
            transform-origin: 50% 50%;
        }

        #bot {
            transform-origin: 15% 85%;
        }

        .open {
            #bot {
                transform: rotateZ(-45deg) scaleX(1.414);
            }

            #mid {
                opacity: 0;
                transform: translateX(-50%);
            }

            #top {
                transform: rotateZ(45deg) scaleX(1.414);
            }
        }
    }

    #logged-in-as {
        font-size: 120%;
        color: var(--text-2);
        padding: 0.25rem 1rem;
    }

    #copyright {
        font-size: 120%;
        padding: 0.25rem 1rem;
    }

    #last-loaded {
        font-size: 120%;
        color: var(--text-2);
        padding: 0.25rem 1rem 0.75rem 1rem;
    }
</style>
