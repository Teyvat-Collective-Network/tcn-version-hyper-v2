<script lang="ts">
    import TextColumn from "./TextColumn.svelte";

    const sizes = { small: "800px", normal: "1200px", large: "1800px" } as const;

    export let size: keyof typeof sizes = "normal";
    export let textColumn = false;
</script>

<div style="margin: 0 calc(max(5%, 50% - {sizes[size]} / 2))">
    {#if textColumn}
        <TextColumn>
            <slot />
        </TextColumn>
    {:else}
        <slot />
    {/if}
</div>
