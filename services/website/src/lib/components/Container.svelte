<script lang="ts">
    const sizes = { small: "800px", normal: "1200px", large: "1800px" } as const;

    export let size: keyof typeof sizes = "normal";
</script>

<div style="margin: 0 calc(max(5%, 50% - {sizes[size]} / 2))">
    <slot />
</div>
