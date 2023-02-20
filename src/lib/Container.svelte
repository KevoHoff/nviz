<script>
    export let size = 'md';

    let sizes = {
        'sm': 'max-w-3xl',
        'md': 'max-w-5xl',
        'lg': 'max-w-7xl'
    }
</script>

<div class="flex flex-wrap p-16 mx-auto {sizes[size]} h-screen relative px-4 sm:p-24">
    <slot></slot>
</div>

<style>

</style>