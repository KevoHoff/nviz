<script>
    export let state  = 'primary';
    export let size = 'md';
    export let active = 'active';
    export let type = 'button';
    export let custom = '';

    let states = {
        'primary': 'h-max text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm dark:bg-purple-600 dark:hover:bg-purple-700 focus:outline-none dark:focus:ring-purple-800',
        'outline': 'h-max text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-purple-500 dark:text-purple-500 dark:hover:text-white dark:hover:bg-purple-600 dark:focus:ring-purple-800'
    }

    let sizes = {
        'xs': 'px-3 py-2 text-xs font-medium',
        'sm': 'px-3 py-2 text-sm font-medium',
        'md': 'px-5 py-2.5 text-sm font-medium',
        'lg': 'px-5 py-3 text-base font-medium'
    }

</script>

{#if active==='active'}
<button {type} on:click class="{states[state].concat(" ", sizes[size], " ", custom)}">
    <slot name="content"></slot>
</button>
{:else}
<button {type} on:click class="{states[state].concat(" ", sizes[size], " ", custom, " ", "cursor-not-allowed")}" disabled>
    <slot name="content"></slot>
</button>
{/if}