<script lang="ts">
    export let icon: string;
    export let brand: boolean | undefined = false;
    let className: string = "";

    export { className as class };
</script>

<span {...$$restProps} class="fa-{brand ? 'brands' : 'solid'} fa-{icon} {className}"></span>

<style lang="scss">
    span {
        width: 1em;
        height: 1em;
    }
</style>
