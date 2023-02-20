<script>
	import { DataFrame } from "./DataFrame";
    // import Overlay from 'svelte-overlay';
    import { createEventDispatcher } from 'svelte';
    import Papa from 'papaparse';
    import Button from "./Button.svelte";

    export let csv = null;
    export let dummy_vars = true;

    const dispatch = createEventDispatcher()
    
    let df = new DataFrame(csv.meta.fields, csv.data)
    let num_headers = df.headers.length - 1;  // minus number of targets
    let modal = true;
    let settings_modal = true;
    let num_decimals = 2;
    let model_config = {
        activation: undefined,
        num_hidden: undefined
    }

    let activation;
    let num_hidden;

    $: num_headers = df.headers.length - 1;
    
    if (dummy_vars) {
        df.make_dummy_cols()
    }

    let selected_col = df.headers[0];
    let target_col = df.headers[1];

    function popCol(key) {
        if (df.headers.length > 2) {
            const idx = df.headers.indexOf(key);

            df.pop(key);
            df = df;
            if (idx === df.headers.length) {
                selected_col = df.headers[idx-1];
            } else {
                selected_col = df.headers[idx];
            }
        }
    }

    function renameCol(key, new_key) {
        df.rename(key, new_key);
        df = df;
    }

    function normalize() {
        df.summarize()
        df = df.normalize()
    }

    function toggleModal() {
        modal = !modal;
    }

    function onSubmit(e) {
        const formData = new FormData(e.target);

        const data = {};
        for (let field of formData) {
            const [key, value] = field;
            data[key] = value;
        }

        renameCol(selected_col, data['colName']);
        toggleModal();
        
        e.target.reset();
    }

    function downloadCSV() {  // TODO: Kevin
        let text = Papa.unparse(df.data);
        const file = new File([text], 'test.csv', {
            type: 'text/plain'
        })
    }

    function submitDF() {
        // df = df.normalize();
        dispatch('upload', {df: df, target: target_col, settings: model_config});
        
    }

    function scrollfn(node, selected_col) {
        return {
            update(selected_col) {
                if (node.innerText === selected_col) {
                    node.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest'});
                }
            }
        }
    }
    
</script>

<svelte:window
	on:keydown={(e) => {
        let idx = df.headers.indexOf(selected_col);
		if (e.key === 'ArrowLeft') {
            if (idx === 0) {
                idx += df.headers.length;
            }
			selected_col = df.headers[(idx - 1) % df.headers.length]
		} else if (e.key === 'ArrowRight') {
            selected_col = df.headers[(idx + 1) % df.headers.length]
        } else if (e.key === 'Enter') {
            target_col = selected_col;
        } else if (e.key === 'Backspace') {
            if (selected_col === target_col) {
                popCol(selected_col);
                target_col = selected_col;
            } else {
                popCol(selected_col)
            }
        }
	}}
/>

<section class="flex-grow self-center">
    <div class="w-md mx-auto">
        <div class="w-full">
            <div class="grid-container max-h-[60vh]">
                <div class="relative shadow-md sm:rounded-lg overflow-auto">
                    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 table-auto">
                        <thead class="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky top-0">
                            <tr>
                                {#each df.headers as header}
                                <th scope="col" class="py-1 px-4">
                                    {#if target_col == header}
                                    <img class="absolute w-3 -ml-1" src="target.png" alt="*">
                                    {/if}
                                    <button use:scrollfn={selected_col} class="text-center hover:bg-gray-100 active:bg-gray-200 sm:rounded-md p-2" class:bg-gray-200={selected_col==header} on:click|self={() => {selected_col = header}} on:focus={() => {selected_col = header}}>
                                        {header}
                                    </button>
                                    
                                </th>
                                {/each}
                            </tr>
                        </thead>
                        <tbody>
                            {#each df.data as row, i}
                                {#if i < 50}
                                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    {#each df.headers as header}
                                    <td class="py-4 mx-6 text-center">
                                        {#if df.types[header]}
                                        <span class="text-gray-400 text-xs cursor-default">{df.filters[header][row[header]]} →</span> {row[header].toFixed(num_decimals)}
                                        {:else}
                                        {row[header].toFixed(num_decimals)}
                                        {/if}
                                    </td>
                                    {/each}
                                </tr>
                                {/if}
                            {/each}
                        </tbody>
                    </table>
                </div>
                <div class="controls flex flex-col justify-around gap-4">
                    <div class="bg-white shadow-md sm:rounded-lg p-4">
                        <h3 class="text-md font-semibold">{selected_col}</h3>
                        <hr class="my-1 h-px bg-gray-200 border-0 dark:bg-gray-700">
                        <div class="">
                            <h4>Actions</h4>
                            <ul class="flex flex-col gap-1">  
                                <li><Button size='sm' on:click={() => {popCol(selected_col)}} disabled={df.headers.length <= 1}><p slot="content">Remove</p></Button></li>
                                <li><Button size='sm' on:click={() => {toggleModal()}}><p slot="content">Rename</p></Button></li>
                                <li><Button size='sm' on:click={() => {target_col = selected_col}}><p slot="content">Set Target</p></Button></li>
                            </ul> 
                        </div>
                    </div>
                    <div class="bg-white shadow-md sm:rounded-lg p-4">
                        <h3 class="text-md font-semibold">Global</h3>
                        <hr class="my-1 h-px bg-gray-200 border-0 dark:bg-gray-700">
                        <div class="">
                            <h4>Actions</h4>
                            <ul class="p-1">
                                <li><Button size='sm' on:click={normalize}><p slot="content">Normalize</p></Button></li>
                                <li>
                                    <label for="decimals" class="text-sm">Visible Deimals</label>
                                    <input type="range" class="w-full" bind:value={num_decimals} id="decimals" name="decimals" min="0" max="5" step="1">
                                </li>
                                <li><Button size='sm' on:click={downloadCSV}><p slot="content">Download</p></Button></li>

                            </ul>     
                        </div>
                    </div>
                </div>
                <h5 id="drawer-label" class="inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400 col-span-2"><svg class="w-5 h-5 mr-2" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>Select at most 8 features</h5>
                <a class="flex justify-center col-span-2" href="/playground">
                    <button type="button" on:click={() => {
                        settings_modal = !settings_modal;
                    }} class="text-white bg-primary hover:bg-deepPrimary focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-primary dark:hover:bg-deepPrimary focus:outline-none dark:focus:ring-blue-800">Play</button>
                </a>
            </div>
            
        </div>
    </div>
    {#if !modal}
    <div class="absolute top-0 left-0 w-full h-full grid place-items-center backdrop-blur-sm">
        <!-- Main modal -->
        <div id="defaultModal" tabindex="-1" aria-hidden="true" class="overflow-x-hidden overflow-y-auto h-modal md:h-fit">
            <div class="relative w-full h-full max-w-2xl md:h-auto">
                <!-- Modal content -->
                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <button type="button" on:click={toggleModal} class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="authentication-modal">
                        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                    <div class="px-6 py-6 lg:px-8">
                        <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Rename Column</h3>
                        <form on:submit|preventDefault={onSubmit} class="space-y-6" action="#">
                            <div class="relative">
                                <input type="text" id="floating_outlined" name="colName" class="block px-2.5 pb-2.5 pt-4 w-1/2 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" required/>
                                <label for="floating_outlined" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Name</label>
                            </div>
                        
                            <button type="submit" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Rename</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    {/if}
    {#if !settings_modal}
    <div class="absolute top-0 left-0 w-full h-full grid place-items-center backdrop-blur-sm">
        <!-- Main modal -->
        <div id="defaultModal" tabindex="-1" aria-hidden="true" class="overflow-x-hidden overflow-y-auto h-modal h-fit">
            <div class="relative w-full h-full max-w-2xl md:h-auto">
                <!-- Modal content -->
                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <button type="button" on:click={() => {settings_modal = !settings_modal}} class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="authentication-modal">
                        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                    <div class="px-6 py-6 lg:px-8">
                        <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Specify model parameters</h3>
                        <form class="space-y-6" action="#">
                            <div>
                                <label for="activation" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Activation</label>
                                <select id="activation" bind:value={model_config.activation} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option value='leaky-relu' selected>Leaky-ReLu</option>
                                <option value='relu'>ReLu</option>
                                <option value="sigmoid">Sigmoid</option>
                                <option value="tanh">Tanh</option>
                                </select>
                            </div>
                            <div>
                                <label for="activation" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Model Dimensions</label>
                                <div class=""> 
                                    <span class="text-gray-400 inline-block select-none">{num_headers} /</span>
                                    <select id="activation" bind:value={model_config.num_hidden} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-min dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 inline-block">
                                        <option value=0 selected>0</option>
                                        <option value=1>1</option>
                                        <option value=2>2</option>
                                        <option value=3>3</option>
                                        <option value=4>4</option>
                                        <option value=5>5</option>
                                        <option value=6>6</option>
                                        <option value=7>7</option>
                                        <option value=8>8</option>
                                    </select>
                                    <span class="text-gray-400 select-none">/ 1</span>
                                </div>
                                
                            </div>
                            <button type="submit" on:click={submitDF} class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    {/if}
    
</section>