<script lang="ts">
    export let title = "Teyvat Collective Network";
    export let description =
        "The Teyvat Collective Network is a network of high-quality Genshin Impact Discord servers, each dedicated to one character. Our mission is to unite mains servers across Teyvat, provide support, and promote collaboration.";
    export let url = "https://teyvatcollective.network";
    export let image = "https://teyvatcollective.network/favicon.png";
    export let color = 0x009688;
</script>

<head>
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:url" content={url} />
    <meta property="og:image" content={image} />
    <meta name="theme-color" data-react-helmet="true" content="#{color.toString(16).padStart(6, '0')}" />
</head>

<slot />
