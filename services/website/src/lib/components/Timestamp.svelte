<script lang="ts">
    export let timestamp: number | string;
    export let mode: "full" | "time" | "date" = "full";
    export let ms = false;

    $: ts = typeof timestamp === "number" ? timestamp : parseInt(timestamp);
    $: real = ms ? ts : ts * 1000;
    $: isostring = mode === "date" ? new Date(real).toISOString() : new Date(real - new Date().getTimezoneOffset() * 60000).toISOString();
</script>

{mode === "time" ? isostring.split("T")[1].slice(0, -5) : mode === "date" ? isostring.split("T")[0] : isostring.replace("T", " | ").slice(0, -5)}
