<script>
// @ts-nocheck

	import { onMount } from 'svelte';
    import Button from '$lib/Button.svelte';
    import { DataFrame } from './DataFrame';
    import Sankey from '$lib/Sankey.svelte';
    
    export let df = undefined;
    export let target = undefined;
    export let model_config = undefined;

    let canvas = undefined;
    let net = undefined;
    let X_train = undefined;
    let modal = true;
    let test_df = {};

    let sankeyProps = {};

    let epoch = 0;
    let error = 0.0;

    const formatter = new Intl.ListFormat('en', {
        style: 'long',
        type: 'conjunction'
    })

    function handleTrain(model, data) {
        console.log(data)
        let results = model.train(data);

        epoch += 1;
        error = results.error;
        sankeyProps = sankeyProps;
    }

    function randomize(df, key) {
        const [rand_min, rand] = df.randomize(key);

        return [rand_min, rand]
    }

    function format_test_df() {
        let X_test = {}
        
        Object.keys(test_df).forEach((key) => {
            X_test[key] = test_df[key].show;
        });

        X_test = new DataFrame(Object.keys(test_df), [X_test]);
        X_test = df.normalize(X_test);
        
        for (const header in test_df) {
            test_df[header].show = test_df[header].show;
            test_df[header].norm = X_test.data[0][header];
        }
    }

    function randomize_all(df) {
        for (const header in test_df) {
            const [rand_min, rand] = randomize(df, header);
            test_df[header].norm = rand_min;
            test_df[header].show = rand;
        }
    }

    function submit_test(net, test_df) {
        let X_test = [{}];
        let display_test = {}
        console.log(test_df)
        for (const header in test_df) {
            X_test[0][header] = test_df[header].norm;
            display_test[header] = test_df[header].show;
        }
        let res = net.run(X_test[0]);
        res = new DataFrame(Object.keys(res), [res]);
        res = df.denormalize(res);
        
        get_results_string(display_test, res.data[0])
    }

    function get_results_string(test, results) {
        let inputs = [];

        for (let input in test) {
            let str = `${input} of ${test[input].toFixed(2)}`;

            inputs.push(str);
        }

        let input_str = formatter.format(inputs);

        let outputs = [];

        for (let output in results) {
            let str = `${output} of ${results[output].toFixed(2)}`;

            outputs.push(str);
        }

        let output_str = formatter.format(outputs);

        let res = `${output_str} ${outputs.length===1 ? 'is' : 'are'} observed given the inputs ${input_str}`
        alert(res);
    }

    onMount(() => {
        
        const config = {
            hiddenLayers: model_config.num_hidden==0 ? [] : [parseInt(model_config.num_hidden)], // array of ints for the sizes of the hidden layers in the network
            activation: model_config.activation, // supported activation types: ['sigmoid', 'relu', 'leaky-relu', 'tanh'],
            iterations: 1,
        };

        // create a simple feed forward neural network with backpropagation
        net = new brain.NeuralNetwork(config);

        X_train = df.target(target);


        handleTrain(net, X_train);
        console.log(net)

        sankeyProps = {
            weights: net.weights,
            net: net
        }

        for (const header in net.inputLookup) {
            test_df[header] = {
                norm: 0.0,
                show: 0.0
            }
        }
    })

</script>

<div class="flex-grow self-center">
    <div class="w-lg rounded-sm shadow-sm mx-auto">
        <div class="">
            <div class="grid-container h-canvas">
                <div class="bg-white w-full-h-canvas">
                    {#if net && net.weights}
                        <Sankey {...sankeyProps}></Sankey>
                    {/if}
                </div>
                <div class="controls flex flex-col justify-center gap-4">
                    <div class="bg-white shadow-md sm:rounded-lg p-4">
                        <h3 class="text-md font-semibold">Info</h3>
                        <hr class="my-1 h-px bg-gray-200 border-0 dark:bg-gray-700">
                        <div class="">
                            <!-- <h4>Info</h4> -->
                            <ul class="p-1">  
                                <li>Epoch: {epoch}</li>
                                <li>Error: {error.toFixed(5)}</li>
                            </ul> 
                        </div>
                    </div>
                    <Button on:click={() => {handleTrain(net, X_train)}}><p slot="content">Train</p></Button>
                    <Button state="outline" on:click={() => {modal = !modal}}><p slot="content">Test</p></Button>
                </div>
            </div>
        </div>
    </div>
    {#if !modal}
    <div class="absolute top-0 left-0 w-full h-full grid place-items-center backdrop-blur-sm">
        <!-- Main modal -->
        <div id="defaultModal" tabindex="-1" aria-hidden="true" class="overflow-x-hidden overflow-y-auto h-modal h-fit">
            <div class="relative w-full h-full max-w-2xl md:h-auto">
                <!-- Modal content -->
                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <button type="button" on:click={() => {modal = !modal}} class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="authentication-modal">
                        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                    <div class="px-6 py-6 lg:px-8">
                        <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Test Configuration</h3>
                        <form class="space-y-6" action="#">
                            <div class="max-h-40 overflow-y-scroll">
                                {#each Object.keys(test_df) as header}
                                <div class="p-2">
                                    <label for="first_name" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">{header}</label>
                                    <input placeholder={df.data[0][header]} bind:value={test_df[header].show} type="number" inputmode="numeric" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                                </div>
                                {/each}
                            </div>
                            <div class="flex gap-2">
                                    <Button on:click={() => {randomize_all(df)}} state="outline" custom="" type="submit h-min">
                                        <img slot="content" class="w-4 aspect-square" src="shuffle.png" alt="Randomize">
                                    </Button>
                                    <Button on:click={() => {format_test_df() ; submit_test(net, test_df)}} type="submit">
                                        <p slot="content">Submit</p>
                                    </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    {/if}
</div>


<style>
    input[type="number"]::-webkit-inner-spin-button {
        display: none;
    }

    input[type="number"] {
        -moz-appearance: textfield;
    }
</style>