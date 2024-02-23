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

<div class="w-full h-screen flex md:flex-row flex-col gap-4">
    <div class="flex flex-none md:flex-col flex-row justify-around bg-surface-50-900-token border-primary-200-700-token">
        <ul class="flex md:flex-col flex-row">
            <li>
                <button on:click={() => {tab = 0}} class:bg-primary-300-600-token={tab === 0} class:hover:bg-surface-100-800-token={tab !==0 } class="flex m-2 justify-center flex-col items-center shadow rounded-full p-3 hover:bg-surface-100-800-token">
                    <svg class="dark:fill-white" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M18.799 7.038c-.496-.535-.799-1.252-.799-2.038 0-1.656 1.344-3 3-3s3 1.344 3 3-1.344 3-3 3c-.146 0-.29-.01-.431-.031l-3.333 6.032c.475.53.764 1.231.764 1.999 0 1.656-1.344 3-3 3s-3-1.344-3-3c0-.583.167-1.127.455-1.587l-2.565-3.547c-.281.087-.58.134-.89.134l-.368-.022-3.355 6.069c.451.525.723 1.208.723 1.953 0 1.656-1.344 3-3 3s-3-1.344-3-3 1.344-3 3-3c.186 0 .367.017.543.049l3.298-5.967c-.52-.539-.841-1.273-.841-2.082 0-1.656 1.344-3 3-3s3 1.344 3 3c0 .617-.187 1.191-.507 1.669l2.527 3.495c.307-.106.637-.164.98-.164.164 0 .325.013.482.039l3.317-6.001zm-3.799 7.962c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1zm-6-8c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1z"/></svg>
                    <!-- <p>Model</p> -->
                </button>
            </li>
            <li>
                <button on:click={() => {tab = 1}} class:bg-primary-300-600-token={tab === 1} class:hover:bg-surface-100-800-token={tab !==1 } class="flex m-2 justify-center flex-col items-center shadow rounded-full p-3 hover:bg-surface-100-800-token">
                    <svg class="dark:fill-white" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm0 2c5.52 0 10 4.481 10 10 0 5.52-4.48 10-10 10-5.519 0-10-4.48-10-10 0-5.519 4.481-10 10-10zm-2 2.252v1.038c-2.89.862-5 3.542-5 6.71 0 3.863 3.137 7 7 7 1.932 0 3.682-.784 4.949-2.051l.706.706c-1.448 1.449-3.448 2.345-5.655 2.345-4.416 0-8-3.585-8-8 0-3.725 2.551-6.859 6-7.748zm0 3.165v1.119c-1.195.692-2 1.984-2 3.464 0 2.208 1.792 4 4 4 1.104 0 2.104-.448 2.828-1.172l.707.707c-.905.904-2.155 1.465-3.535 1.465-2.76 0-5-2.24-5-5 0-2.049 1.235-3.811 3-4.583zm1 2.851v-6.268c0-.265.105-.52.293-.707.187-.188.442-.293.707-.293.265 0 .52.105.707.293.188.187.293.442.293.707v6.268c.598.346 1 .992 1 1.732 0 1.104-.896 2-2 2s-2-.896-2-2c0-.74.402-1.386 1-1.732z"/></svg>
                    <!-- <p>Stats</p> -->
                </button>
            </li>
            <li>
                <button on:click={() => {tab = 2}} class:bg-primary-300-600-token={tab === 2} class:hover:bg-surface-100-800-token={tab !==2 } class="flex m-2 justify-center flex-col items-center shadow rounded-full p-3 hover:bg-surface-100-800-token">
                    <svg class="dark:fill-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.759 20.498l-3.743-7.856c-1.041-2.186-2.016-4.581-2.016-7.007v-2.635h-2c0 3.391-.083 5.188 2.21 10.502l3.743 7.854c.143.302-.068.644-.377.644h-1.246l-4.88-10h-2.984c1.795-4.183 1.528-5.963 1.534-9h-2v2.635c0 2.426-.975 4.82-2.016 7.006l-3.743 7.856c-.165.348-.241.708-.241 1.058 0 1.283 1.023 2.445 2.423 2.445h13.153c1.4 0 2.424-1.162 2.424-2.446 0-.35-.076-.709-.241-1.056zm-13.259 1.502c-.829 0-1.5-.671-1.5-1.5s.671-1.5 1.5-1.5 1.5.671 1.5 1.5-.671 1.5-1.5 1.5zm2.5-4c-.553 0-1-.447-1-1 0-.553.447-1 1-1 .552 0 1 .447 1 1 0 .553-.448 1-1 1zm3 3c-.552 0-1-.448-1-1s.448-1 1-1 1 .448 1 1-.448 1-1 1zm-5-20c0-.552.448-1 1-1h6c.553 0 1 .448 1 1s-.447 1-1 1h-6c-.552 0-1-.448-1-1z"/></svg>
                    <!-- <p>Test</p> -->
                </button>
            </li>
        </ul>
    </div>
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
    <div class="flex-none flex justify-center md:flex-col flex-row h-full gap-2">
        <div class="bg-surface-200-700-token shadow rounded-lg p-4 h-fit md:block hidden">
            <p>Epoch: {elapsed_epochs}</p>
            <p>Error: {elapsed_error.toFixed(4)}</p>
        </div>
        <button class="btn variant-filled-primary text-white h-fit md:w-fit w-full" on:click={handleClick}>
                {#await promise}
                    <!-- <ProgressRadial stroke={100} width="w-6" meter="stroke-primary-400" track="stroke-primary-500"/> -->
                    <p>...waiting</p>
                {:then}
                    <span>Train</span>
                {/await}
        </button>
    </div>
</div>