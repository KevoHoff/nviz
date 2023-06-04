<script lang="ts">
    import { onMount } from "svelte";
    import type { DataFrame } from '$lib/DataFrame';
    import Sankey from "$lib/Sankey.svelte";
	import Dashboard from "$lib/Dashboard.svelte";
    import Tester from "$lib/Tester.svelte";
    import { ProgressRadial } from '@skeletonlabs/skeleton';

    export let num_hidden: number = 0;
    export let activation: string = 'sigmoid';
    export let df: DataFrame;
    export let targets: Array<string>;
    export let model_type: string = 'regression';
    export let tab: number = 0;

    let train_epochs = 1;
    let net: any;
    let train_data: any;
    let elapsed_epochs = 0;
    let elapsed_error = -1;
    let error_history: Array<number> = [];
    let epoch_history: Array<number> = [];
    let promise = new Promise(() => '');

    const config = {
            hiddenLayers: num_hidden===0 ? [] : [num_hidden], // array of ints for the sizes of the hidden layers in the network
            activation: activation, // supported activation types: ['sigmoid', 'relu', 'leaky-relu', 'tanh'],
            iterations: train_epochs,
        };

    async function train() {
        let stats = net.train(train_data);
        net = net;
        elapsed_epochs++;
        elapsed_error = stats.error;

        epoch_history.push(1);
        error_history.push(elapsed_error);

        epoch_history = epoch_history;
        error_history = error_history;
    }

    function handleClick() {
        promise = train();
    }

    onMount(() => {
        df = df.normalize();
        train_data = df.target(targets);
        net = new brain.NeuralNetwork(config);
        handleClick();
    })
</script>

<div class="w-full h-full flex gap-4 p-4">
    <div class:bg-surface-200-700-token={tab !== 2} class="flex-grow rounded-lg">
        {#if net?.weights.length > 0}
            {#if tab === 0}
                <Sankey {net}></Sankey>
            {:else if tab === 1}
                <Dashboard {error_history} {epoch_history}></Dashboard>
            {:else if tab === 2}
                <Tester {net} {df} {targets}></Tester>
            {/if}
        {/if}
    </div>
    <div class="flex-none flex justify-center flex-col h-full gap-2">
        <div class="bg-surface-200-700-token shadow rounded-lg p-4">
            <p>Epoch: {elapsed_epochs}</p>
            <p>Error: {elapsed_error.toFixed(4)}</p>
        </div>
        <button class="btn variant-filled h-fit" on:click={handleClick}>
                {#await promise}
                    <!-- <ProgressRadial stroke={100} width="w-6" meter="stroke-primary-400" track="stroke-primary-500"/> -->
                    <p>...waiting</p>
                {:then}
                    <span>Train</span>
                {/await}
        </button>
    </div>
</div>