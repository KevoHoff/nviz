<script>
    import Button from "$lib/Button.svelte";
</script>

<div class="flex-grow self-center text-center flex">
    <div class="flex flex-col self-center mx-auto text-grad border-none">
        <h1 class="md:text-5xl sm:text-3xl">Learn <span class="text-transparent">Neural Networks</span> the <span class="text-transparent">easy</span> way.</h1>
        <p class="md:text-xl sm:text-lg">Visualize models in your browser</p>
        <div class="p-8">
            <a href="/playground">
                <Button><p slot="content">Get Started</p></Button>
            </a>
        </div>
    </div>
    <img class="md:h-96 h-64 md:block hidden" src="nviz.png" alt="NVIZ Logo">
</div>

<style>
    .text-grad {
        /* background: linear-gradient(to right, #C33764, #1D2671); */
        /* background: linear-gradient(to right, #4568DC, #B06AB3); */
        background: linear-gradient(to right, #3f5efb, #fc466b);
        -webkit-background-clip: text;
        /* -webkit-text-fill-color: transparent; */
    }
</style>